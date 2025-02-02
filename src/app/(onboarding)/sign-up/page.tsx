import { auth } from '@/auth';
import { RegistrationForm } from '@/components/custom/forms/onboarding/registration-form';
import { redirect } from 'next/navigation';

export default async function SignUpPage() {
	const session = await auth();

	if (session) {
		redirect('/dashboard');
	}
	return <RegistrationForm />;
}
