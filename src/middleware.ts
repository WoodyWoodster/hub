export { auth as middleware } from '@/auth';

export const config = {
	matcher: ['/dashboard/:path*', '/onboarding/:path*', '/people/:path*'],
};
