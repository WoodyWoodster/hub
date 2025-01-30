import { auth } from '@/auth';
import LogInForm from '@/components/custom/forms/auth/log-in-form';
import { redirect } from 'next/navigation';

export default async function LogIn() {
	const session = await auth();
	if (session) {
		redirect('/');
	}
	return <LogInForm />;
}
