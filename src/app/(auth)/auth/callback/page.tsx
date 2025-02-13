'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { setAuthCookies } from '@/lib'

export default function AuthCallback() {
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        const accessToken = searchParams.get('accessToken')
        const refreshToken = searchParams.get('refreshToken')

        if (accessToken && refreshToken) {
            setAuthCookies({
                accessToken,
                refreshToken,
            });

            // Redirect to home page
            router.push('/dashboard')
        }
    }, [searchParams, router])

    return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-lg font-semibold text-gray-700">
                Authenticating... Please wait.
            </p>
        </div>
    )
}