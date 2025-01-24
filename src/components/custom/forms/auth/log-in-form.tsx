'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Card,
	CardHeader,
	CardContent,
	CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function LogInForm() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');

		const result = await signIn('credentials', {
			redirect: false,
			email,
			password,
		});

		if (result?.error) {
			setError('Invalid email or password');
		} else {
			router.push('/');
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
			<Card className="w-full max-w-md">
				<CardHeader>
					<h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
						Log in to HRA Hub
					</h2>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-6">
						{error && <div className="text-center text-red-500">{error}</div>}
						<div className="space-y-2">
							<Label htmlFor="email">Email address</Label>
							<Input
								id="email"
								name="email"
								type="email"
								required
								autoComplete="email"
								placeholder="Email address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<Label htmlFor="password">Password</Label>
								<a
									href="#"
									className="text-primary hover:text-primary/80 text-sm font-semibold"
								>
									Forgot password?
								</a>
							</div>
							<Input
								id="password"
								name="password"
								type="password"
								required
								autoComplete="current-password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<Button type="submit" className="w-full">
							Log in
						</Button>
					</form>
				</CardContent>
				<CardFooter>
					<p className="text-center text-sm text-gray-500">
						Not a member?{' '}
						<a
							href="#"
							className="text-primary hover:text-primary/80 font-semibold"
						>
							Start a 14 day free trial
						</a>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
