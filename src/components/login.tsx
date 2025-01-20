import { signIn } from '@/auth'

export const LogInForm = () => {
    return (
        <form
            action={async () => {
                'use server'
                await signIn('cognito')
            }}
        >
            <button type="submit">Log In</button>
        </form>
    )
}
