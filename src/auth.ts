import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import {
	AuthFlowType,
	CognitoIdentityProviderClient,
	AdminInitiateAuthCommand,
	ListUsersCommand,
	type ListUsersCommandInput,
	AdminCreateUserCommand,
	AdminSetUserPasswordCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { err, ok, Result } from './types/result';
import { companyPeople, people } from './db/schema';
import { db } from './db';
import { eq } from 'drizzle-orm';

const cognitoClient = new CognitoIdentityProviderClient({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.COGNITO_ACCESS_KEY_ID as string,
		secretAccessKey: process.env.COGNITO_SECRET_ACCESS_KEY as string,
	},
});

interface CreateUserError {
	message: string;
}

type CreateUserResult = Result<boolean, CreateUserError>;

export const createUser = async (
	email: string,
	password: string,
	userAttributes: { [key: string]: string },
): Promise<CreateUserResult> => {
	const params = {
		UserPoolId: process.env.COGNITO_USER_POOL_ID,
		Username: email,
		TemporaryPassword: password,
		UserAttributes: Object.entries(userAttributes).map(([Name, Value]) => ({
			Name,
			Value,
		})),
	};

	try {
		const command = new AdminCreateUserCommand(params);
		const result = await cognitoClient.send(command);
		if (!result.User) {
			return err({ message: 'Failed to create user' });
		}
		// TODO: Check if the user is an admin and set the user's password as permanent
		// If they aren't we need to send a welcome email with a link to set their password
		const setPermanentPasswordCommand = new AdminSetUserPasswordCommand({
			UserPoolId: process.env.COGNITO_USER_POOL_ID,
			Username: email,
			Password: password,
			Permanent: true,
		});
		const setPasswordResult = await cognitoClient.send(
			setPermanentPasswordCommand,
		);
		if (
			!setPasswordResult.$metadata.httpStatusCode ||
			setPasswordResult.$metadata.httpStatusCode !== 200
		) {
			return err({ message: 'Failed to set permanent password' });
		}
		return ok(true);
	} catch (error) {
		console.error('Error creating user:', error);
		const errorMessage =
			error instanceof Error ? error.message : 'An unexpected error occurred';
		return err({ message: errorMessage });
	}
};

async function getUsernameByEmail(email: string): Promise<string | null> {
	const params: ListUsersCommandInput = {
		UserPoolId: process.env.COGNITO_USER_POOL_ID,
		Filter: `email = "${email}"`,
		Limit: 1,
	};

	try {
		const command = new ListUsersCommand(params);
		const response = await cognitoClient.send(command);

		if (response.Users && response.Users.length > 0) {
			const username = response.Users[0].Username;
			return username || null;
		} else {
			return null;
		}
	} catch (error) {
		console.error('Error fetching user by email:', error);
		return null;
	}
}

export const { handlers, auth, signIn, signOut } = NextAuth({
	pages: {
		signIn: '/login',
	},
	callbacks: {
		authorized: async ({ auth }) => {
			return !!auth;
		},
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id as string;
				token.personId = user.personId;
				token.companyId = user.companyId;
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
				session.user.personId = token.personId as string;
				session.user.companyId = token.companyId as string;
			}
			return session;
		},
	},
	providers: [
		CredentialsProvider({
			name: 'Cognito',
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error('Please enter an email and password');
				}

				try {
					const username = await getUsernameByEmail(
						credentials.email as string,
					);

					if (!username) {
						throw new Error('User not found');
					}

					const params = {
						AuthFlow: AuthFlowType.ADMIN_USER_PASSWORD_AUTH,
						ClientId: process.env.COGNITO_CLIENT_ID,
						UserPoolId: process.env.COGNITO_USER_POOL_ID,
						AuthParameters: {
							USERNAME: credentials.email as string,
							PASSWORD: credentials.password as string,
						},
					};

					const command = new AdminInitiateAuthCommand(params);
					const response = await cognitoClient.send(command);

					if (response.AuthenticationResult) {
						const [person] = await db
							.select()
							.from(people)
							.where(eq(people.email, credentials.email as string))
							.limit(1);

						if (!person) {
							throw new Error('Person not found');
						}

						const [defaultCompany] = await db
							.select()
							.from(companyPeople)
							.where(eq(companyPeople.personId, person.id));

						if (!defaultCompany) {
							throw new Error('Default company not found');
						}

						const user = {
							id: username,
							personId: person.id,
							companyId: defaultCompany.companyId,
							email: person.email,
							name: person.fullName,
							accessToken: response.AuthenticationResult.AccessToken,
							refreshToken: response.AuthenticationResult.RefreshToken,
						};
						return user;
					} else {
						throw new Error('Authentication failed', { cause: response });
					}
				} catch (error) {
					console.error('Error during Cognito authentication:', error);
					if (error instanceof Error) {
						throw new Error(error.message);
					}
					throw new Error('An unexpected error occurred');
				}
			},
		}),
	],
});
