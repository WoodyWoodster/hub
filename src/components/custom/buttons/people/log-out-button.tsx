import { logOut } from '@/lib/actions/people/actions';

export function LogOutButton() {
	return <button onClick={() => logOut()}>Log Out</button>;
}
