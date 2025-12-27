'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { ArrowLeft, AlertCircle } from 'lucide-react'
import { userApi } from '@/lib/api'
import { useAuth } from '@/lib/hooks'

// Dynamic import for scene
const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })
import { AuthVisual } from '@/components/illustrations/AuthVisual'

export default function LoginPage() {
    const router = useRouter()
    const containerRef = useRef<HTMLDivElement>(null)
    const { login } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useGSAP(() => {
        gsap.from('.visual-side', {
            x: -50,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out'
        })
        gsap.from('.form-side', {
            x: 50,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.2
        })
    }, { scope: containerRef })

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const response = await userApi.login({ email, password })
            login(response.user)
            router.push('/dashboard')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed. Please check your credentials.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div ref={containerRef} className="min-h-screen w-full flex bg-background overflow-hidden relative">

            {/* Left Side: Visuals */}
            <div className="visual-side hidden lg:flex w-1/2 relative flex-col items-center justify-center bg-muted/20 border-r border-border/50 p-12 overflow-hidden">

                {/* 3D Scene - Positioned to the left/background as requested */}
                <div className="absolute inset-0 z-0 opacity-60">
                    <Scene />
                </div>

                {/* 2D Image Section */}
                <div className="relative z-10 flex flex-col items-center">
                    <div className="mb-8">
                        <AuthVisual />
                    </div>

                    <h2 className="text-5xl font-serif font-bold text-foreground mb-4">Master Maintenance</h2>
                    <p className="text-xl text-muted-foreground max-w-md text-center leading-relaxed">
                        Access the premium dashboard to track equipment, assign teams, and schedule repairs.
                    </p>
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="form-side w-full lg:w-1/2 flex items-center justify-center p-6 relative">
                <Link href="/" className="absolute top-8 left-8 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>

                <Card className="w-full max-w-md border-0 lg:border border-border/50 shadow-none lg:shadow-2xl bg-transparent lg:bg-card">
                    <CardHeader className="space-y-1 text-center">
                        <CardTitle className="text-4xl font-sans tracking-tighter mb-2">Welcome Back</CardTitle>
                        <CardDescription className="text-base">
                            Enter your credentials to access the Maintenance Core.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {error && (
                            <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-2 text-destructive text-sm">
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">Email</label>
                                <Input
                                    id="email"
                                    placeholder="technician@gearguard.com"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="bg-muted/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="text-sm font-medium">Password</label>
                                    <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="bg-muted/50"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full font-bold text-lg"
                                variant="premium"
                                disabled={loading}
                            >
                                {loading ? 'Authenticating...' : 'Sign In'}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <p className="text-sm text-muted-foreground">
                            Don't have an account? <Link href="/register" className="text-primary font-bold hover:underline">Register Device</Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
