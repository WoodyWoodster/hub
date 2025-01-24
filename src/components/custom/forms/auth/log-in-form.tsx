'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
						Sign in to HRA Hub
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form
						action="#"
						method="POST"
						className="space-y-6"
						onSubmit={handleSubmit}
					>
						{error && <div className="text-center text-red-500">{error}</div>}
						<div>
							<Label
								htmlFor="email"
								className="block text-sm/6 font-medium text-gray-900"
							>
								Email address
							</Label>
							<div className="mt-2">
								<Input
									id="email"
									name="email"
									type="email"
									required
									autoComplete="email"
									className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
									placeholder="Email address"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<Label
									htmlFor="password"
									className="block text-sm/6 font-medium text-gray-900"
								>
									Password
								</Label>
								<div className="text-sm">
									<a
										href="#"
										className="text-primary font-semibold hover:text-emerald-600"
									>
										Forgot password?
									</a>
								</div>
							</div>
							<div className="mt-2">
								<Input
									id="password"
									name="password"
									type="password"
									required
									autoComplete="current-password"
									className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
									placeholder="Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="bg-primary flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Sign in
							</button>
						</div>
					</form>

					<p className="mt-10 text-center text-sm/6 text-gray-500">
						Not a member?{' '}
						<a
							href="#"
							className="text-primary font-semibold hover:text-emerald-600"
						>
							Start a 14 day free trial
						</a>
					</p>
				</div>
			</div>
		</>
	);
}
