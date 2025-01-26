import { auth } from '@/auth';
import { SignUpForm } from '@/components/custom/forms/onboarding/sign-up-form';
import { redirect } from 'next/navigation';

export default async function SignUpPage() {
	const session = await auth();

	if (session) {
		redirect('/dashboard');
	}
	return <SignUpForm />;
}
