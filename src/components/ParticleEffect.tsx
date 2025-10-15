// src/components/ParticleEffect.tsx
import React, { useEffect, useRef } from 'react'

interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    life: number
    maxLife: number
    size: number
    color: string
}

interface ParticleEffectProps {
    trigger: boolean
    onComplete?: () => void
}

export const ParticleEffect: React.FC<ParticleEffectProps> = ({ trigger, onComplete }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationRef = useRef<number>()
    const particlesRef = useRef<Particle[]>([])

    useEffect(() => {
        if (!trigger) return

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Configurar canvas
        const rect = canvas.getBoundingClientRect()
        canvas.width = rect.width
        canvas.height = rect.height

        // Criar partículas
        const colors = ['#7c3aed', '#58a6ff', '#ff7b72', '#ffa657', '#3fb950']
        const particles: Particle[] = []

        for (let i = 0; i < 15; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: canvas.height + 10,
                vx: (Math.random() - 0.5) * 4,
                vy: -Math.random() * 3 - 2,
                life: 0,
                maxLife: 60 + Math.random() * 40,
                size: Math.random() * 3 + 1,
                color: colors[Math.floor(Math.random() * colors.length)]
            })
        }

        particlesRef.current = particles

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            let activeParticles = 0

            particles.forEach(particle => {
                if (particle.life < particle.maxLife) {
                    activeParticles++
                    
                    // Atualizar posição
                    particle.x += particle.vx
                    particle.y += particle.vy
                    particle.vy += 0.1 // gravidade
                    particle.life++

                    // Calcular opacidade
                    const alpha = 1 - (particle.life / particle.maxLife)

                    // Desenhar partícula
                    ctx.save()
                    ctx.globalAlpha = alpha
                    ctx.fillStyle = particle.color
                    ctx.shadowBlur = 10
                    ctx.shadowColor = particle.color
                    ctx.beginPath()
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
                    ctx.fill()
                    ctx.restore()
                }
            })

            if (activeParticles > 0) {
                animationRef.current = requestAnimationFrame(animate)
            } else {
                onComplete?.()
            }
        }

        animate()

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [trigger, onComplete])

    if (!trigger) return null

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 10
            }}
        />
    )
}