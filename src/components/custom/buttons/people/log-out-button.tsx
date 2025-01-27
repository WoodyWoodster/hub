import { logOut } from '@/lib/actions/people/actions';
import { useRouter } from 'next/navigation';

export function LogOutButton() {
	const router = useRouter();

	const handleLogout = async () => {
		console.log('Logout initiated');
		try {
			await logOut();
			console.log('Logout successful');
			router.push('/login');
		} catch (error) {
			console.error('Logout failed', error);
		}
	};

	return <button onClick={handleLogout}>Log Out</button>;
}
