import { signIn } from '@/auth'

export const LogInButton = () => {
    return (
        <form
            action={async () => {
                'use server'
                await signIn('cognito', { redirectTo: '/dashboard' })
            }}
        >
            <button type="submit">Log In</button>
        </form>
    )
}
