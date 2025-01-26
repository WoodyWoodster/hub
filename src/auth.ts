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

const cognitoClient = new CognitoIdentityProviderClient({
	region: process.env.AWS_REGION,
});

interface User {
	id: string;
	email: string;
	name: string;
	accessToken: string | undefined;
	refreshToken: string | undefined;
}

interface CreateUserError {
	message: string;
}

type CreateUserResult = Result<boolean, CreateUserError>;

export const createUser = async (
	email: string,
	password: string,
): Promise<CreateUserResult> => {
	const params = {
		UserPoolId: process.env.COGNITO_USER_POOL_ID,
		Username: email,
		TemporaryPassword: password,
		// UserAttributes
	};

	try {
		const command = new AdminCreateUserCommand(params);
		const result = await cognitoClient.send(command);
		if (result.User) {
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
		} else {
			return err({ message: 'Failed to create user' });
		}
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
						const user: User = {
							id: username,
							email: credentials.email as string,
							name: credentials.email as string,
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
