import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import {
	AuthFlowType,
	CognitoIdentityProviderClient,
	AdminInitiateAuthCommand,
	ListUsersCommand,
	type ListUsersCommandInput,
} from '@aws-sdk/client-cognito-identity-provider';

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
