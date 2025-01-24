import { useState } from 'react';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function SignUpForm() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setIsLoading(false);
	};

	return (
		<div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
			<Card className="w-full sm:w-96">
				<CardHeader>
					<CardTitle className="text-center text-2xl font-bold tracking-tight text-gray-900">
						HRA Hub
					</CardTitle>
				</CardHeader>
				<form onSubmit={handleSubmit}>
					<CardContent className="space-y-6">
						<div className="space-y-2">
							<Label htmlFor="email">Email address</Label>
							<Input
								id="email"
								type="email"
								placeholder="Email address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
					</CardContent>
					<CardFooter className="flex flex-col space-y-4">
						<Button type="submit" className="w-full" disabled={isLoading}>
							Sign Up
						</Button>
						<Button variant="link" asChild className="w-full">
							<Link href="/login">Already have an account? Sign in</Link>
						</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
