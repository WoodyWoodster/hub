'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import {
	Card,
	CardHeader,
	CardContent,
	CardFooter,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { track } from '@vercel/analytics/react';
import { LogoPrimary } from '@/components/logo';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { LoginFormValues, loginSchema } from '@/lib/schemas/auth/login-schema';

export default function LoginForm() {
	const [serverError, setServerError] = useState('');
	const router = useRouter();
	const searchParams = useSearchParams();

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (data: LoginFormValues) => {
		setServerError('');

		const callbackUrl = searchParams.get('callbackUrl') || '/';

		const result = await signIn('credentials', {
			redirect: false,
			email: data.email,
			password: data.password,
		});

		if (result?.error) {
			setServerError('Invalid email or password');
		} else {
			track('Logged in', { email: data.email });
			router.push(callbackUrl);
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-center text-2xl font-bold tracking-tight text-gray-900">
						<LogoPrimary className="mx-auto w-2/3" />
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							{serverError && (
								<div className="text-critical-700 text-center">
									{serverError}
								</div>
							)}
							<FormField
								control={form.control}
								name="email"
								render={({ field, fieldState }) => (
									<FormItem>
										<FormLabel
											className={`text-base font-medium ${fieldState.error ? 'text-critical-700' : 'text-gray-900'}`}
										>
											Email address
										</FormLabel>
										<FormControl>
											<Input
												type="email"
												placeholder="Email address"
												className={
													fieldState.error ? 'border-critical-700' : ''
												}
												{...field}
											/>
										</FormControl>
										<FormMessage className="text-critical-700 mt-1.5 text-sm" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field, fieldState }) => (
									<FormItem>
										<div className="flex items-center justify-between">
											<FormLabel
												className={`text-base font-medium ${fieldState.error ? 'text-critical-700' : 'text-gray-900'}`}
											>
												Password
											</FormLabel>
											<a
												href="#"
												className="text-primary hover:text-primary/80 text-sm font-semibold"
											>
												Forgot password?
											</a>
										</div>
										<FormControl>
											<Input
												type="password"
												placeholder="Password"
												className={
													fieldState.error ? 'border-critical-700' : ''
												}
												{...field}
											/>
										</FormControl>
										<FormMessage className="text-critical-700 mt-1.5 text-sm" />
									</FormItem>
								)}
							/>
							<Button type="submit" className="w-full">
								Log in
							</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter>
					<p className="text-center text-sm text-gray-500">
						Don&apos;t have an account?{' '}
						<Link
							href="/sign-up"
							className="text-primary hover:text-primary/80 font-semibold"
						>
							Register your company
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
