import type { DefaultSession, DefaultUser } from 'next-auth';
import type { JWT as DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
	interface Session extends DefaultSession {
		user: {
			id: string;
			personId: string;
			companyId: string;
		} & DefaultSession['user'];
	}

	interface User extends DefaultUser {
		personId: string;
		companyId: string;
		accessToken?: string;
		refreshToken?: string;
	}
}

declare module 'next-auth/jwt' {
	interface JWT extends DefaultJWT {
		id: string;
		personId: string;
		companyId: string;
	}
}
