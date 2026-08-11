'use client'
import { signOut } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

type ButtonVariant = 'primary' | 'success' | 'warning' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    size?: ButtonSize
    isLoading?: boolean
}

export function Button({
    variant = 'primary',
    size = 'md',
    isLoading,
    className = '',
    ...props
}: ButtonProps) {
    const standardStyles =
        'rounded-lg shadow-md transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'

    const buttonStyles: Record<ButtonVariant, string> = {
        primary: 'bg-[#2563EB] text-white hover:bg-[#1E3A8A]',
        success: 'bg-[#22C55E] text-white hover:bg-[#16A34A]',
        warning: 'bg-[#F59E0B] text-white hover:bg-[#E67F0D]',
        danger: 'bg-[#EF4444] text-white hover:bg-[#E33A3A]'
    }
    const sizeStyles: Record<ButtonSize, string> = {
        sm: 'px-2 py-0.5',
        md: 'px-4 py-1',
        lg: 'px-6 py-1.5'
    }

    return (
        <button
            className={`${standardStyles} ${sizeStyles[size]} ${buttonStyles[variant]} ${className}`}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? 'loading...' : props.children}
        </button>
    )
}
// Primary:#2563EB Success:#22C55E Warning:#F59E0B Danger:#EF4444

export function LogoutButton({ className = "" }: { className?: string }) {
    const router = useRouter()
    const handleLogout = async (): Promise<void> => {
        try {
            await signOut()
            router.push('/')
        } catch (error) {
            console.error('Could not log out:', error)
        }
    }
    return (
        <Button
            variant="danger"
            // size="sm"
            className={className}
            onClick={handleLogout}
        >
            Logout
        </Button>
    )
}
