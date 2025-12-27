'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { ArrowLeft } from 'lucide-react'

// Dynamic import for scene
const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })
import { AuthVisual } from '@/components/illustrations/AuthVisual'

export default function RegisterPage() {
    const router = useRouter()
    const containerRef = useRef<HTMLDivElement>(null)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)

    useGSAP(() => {
        // Animation for the split layout
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

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        // Simulate registration
        setTimeout(() => {
            setLoading(false)
            router.push('/dashboard')
        }, 1000)
    }

    return (
        <div ref={containerRef} className="min-h-screen w-full flex bg-background overflow-hidden relative">

            {/* Left Side: 3D Visual + 2D Illustration */}
            <div className="visual-side hidden lg:flex w-1/2 relative flex-col items-center justify-center bg-muted/30 border-r border-border/50 p-12 overflow-hidden">
                {/* 3D Scene Background/Floater */}
                <div className="absolute inset-0 opacity-50 pointer-events-none">
                    <Scene />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 text-center max-w-lg flex flex-col items-center">
                    <div className="mb-8">
                        <AuthVisual />
                    </div>

                    <h2 className="text-4xl font-serif font-bold mb-4 text-foreground">Join the Elite</h2>
                    <p className="text-lg text-muted-foreground">
                        Create your workspace and start managing equipment with royal precision.
                    </p>
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="form-side w-full lg:w-1/2 flex items-center justify-center p-6 relative">
                <Link href="/" className="absolute top-8 left-8 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back
                </Link>

                <Card className="w-full max-w-md border-0 lg:border border-border/50 shadow-none lg:shadow-2xl bg-transparent lg:bg-card">
                    <CardHeader className="space-y-1 text-center">
                        <CardTitle className="text-3xl font-sans tracking-tighter mb-2">Create Account</CardTitle>
                        <CardDescription className="text-base">
                            Enter your details to initialize your workspace.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleRegister} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Full Name</label>
                                <Input
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    required
                                    className="bg-muted/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email</label>
                                <Input
                                    type="email"
                                    placeholder="user@gearguard.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    className="bg-muted/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Password</label>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    className="bg-muted/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Confirm Password</label>
                                <Input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    required
                                    className="bg-muted/50"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full font-bold text-lg mt-4"
                                variant="premium"
                                disabled={loading}
                            >
                                {loading ? 'Creating...' : 'Register'}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <p className="text-sm text-muted-foreground">
                            Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Sign In</Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
