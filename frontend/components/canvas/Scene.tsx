'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, MeshDistortMaterial, Sphere, Torus, Stars } from '@react-three/drei'
import { useRef } from 'react'
import { Group } from 'three'

function AnimatedShape({ position, color, speed }: { position: [number, number, number], color: string, speed: number }) {
    const meshRef = useRef<any>(null)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.distort = 0.4 + Math.sin(state.clock.elapsedTime * speed) * 0.2
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
        }
    })

    return (
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <Sphere args={[1, 64, 64]} position={position} scale={1.5}>
                <MeshDistortMaterial
                    ref={meshRef}
                    color={color}
                    envMapIntensity={1}
                    clearcoat={1}
                    clearcoatRoughness={0}
                    metalness={0.5}
                />
            </Sphere>
        </Float>
    )
}

function FloatingRing({ position, color }: { position: [number, number, number], color: string }) {
    const meshRef = useRef<any>(null)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
        }
    })

    return (
        <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
            <Torus args={[3, 0.05, 16, 100]} position={position} rotation={[Math.PI / 2, 0, 0]} ref={meshRef}>
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />
            </Torus>
        </Float>
    )
}

export default function Scene() {
    return (
        <div className="absolute inset-0 w-full h-full">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true, alpha: true }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#fbbf24" />

                <group position={[0, -1, 0]}>
                    {/* Main Organic Shape */}
                    <AnimatedShape position={[0, 0, 0]} color="#fbbf24" speed={3} />

                    {/* Secondary Accents */}
                    <AnimatedShape position={[-3, 2, -2]} color="#059669" speed={2} />
                    <AnimatedShape position={[3, -2, -2]} color="#d97706" speed={2.5} />

                    {/* Tech Elements */}
                    <FloatingRing position={[0, 0, 0]} color="#fbbf24" />
                    <FloatingRing position={[0, 0, 0]} color="#059669" />
                </group>

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <Environment preset="city" />
            </Canvas>
        </div>
    )
}
