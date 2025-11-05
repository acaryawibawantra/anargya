'use client'

import { useEffect, useRef } from 'react'

export default function NOSCursorEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particle class for NOS trail
    class NOSParticle {
      x: number
      y: number
      vx: number
      vy: number
      life: number
      maxLife: number
      size: number
      color: string

      constructor(x: number, y: number, vx: number, vy: number) {
        this.x = x
        this.y = y
        this.vx = vx + (Math.random() - 0.5) * 2
        this.vy = vy + (Math.random() - 0.5) * 2
        this.life = 1
        this.maxLife = Math.random() * 30 + 20
        this.size = Math.random() * 4 + 2
        this.color = Math.random() > 0.5 ? '#00ff88' : '#00cc6a'
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.life -= 1 / this.maxLife
        this.vx *= 0.98
        this.vy *= 0.98
        // Pastikan life tidak pernah negatif
        this.life = Math.max(0, this.life)
      }

      draw() {
        if (!ctx) return
        // Clamp life untuk menghindari nilai negatif
        const life = Math.max(0, this.life)
        if (life <= 0) return

        ctx.save()
        ctx.globalAlpha = life * 0.8

        // Glow effect
        ctx.shadowBlur = 15
        ctx.shadowColor = this.color

        ctx.fillStyle = this.color
        ctx.beginPath()
        // Clamp radius agar tidak negatif atau terlalu kecil
        const radius = Math.max(0.001, this.size * life)
        ctx.arc(this.x, this.y, radius, 0, Math.PI * 2)
        ctx.fill()

        ctx.restore()
      }

      isDead() {
        return this.life <= 0
      }
    }

    const particles: NOSParticle[] = []
    let mouseX = 0
    let mouseY = 0
    let prevMouseX = 0
    let prevMouseY = 0

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      prevMouseX = mouseX
      prevMouseY = mouseY
      mouseX = e.clientX
      mouseY = e.clientY

      // Calculate velocity
      const vx = (mouseX - prevMouseX) * 0.5
      const vy = (mouseY - prevMouseY) * 0.5
      const speed = Math.sqrt(vx * vx + vy * vy)

      // Only create particles if mouse is moving
      if (speed > 1) {
        // Create multiple particles based on speed
        const particleCount = Math.min(Math.floor(speed / 5), 5)
        for (let i = 0; i < particleCount; i++) {
          particles.push(new NOSParticle(mouseX, mouseY, -vx, -vy))
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    let animationFrame: number
    const animate = () => {
      // Clear with fade effect
      ctx.fillStyle = 'rgba(10, 10, 10, 0.15)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update()
        particles[i].draw()
        
        if (particles[i].isDead()) {
          particles.splice(i, 1)
        }
      }

      // Draw cursor glow
      if (mouseX > 0 && mouseY > 0) {
        ctx.save()
        
        const gradient = ctx.createRadialGradient(
          mouseX, mouseY, 0,
          mouseX, mouseY, 40
        )
        gradient.addColorStop(0, 'rgba(0, 255, 136, 0.4)')
        gradient.addColorStop(0.5, 'rgba(0, 255, 136, 0.2)')
        gradient.addColorStop(1, 'rgba(0, 255, 136, 0)')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(mouseX, mouseY, 40, 0, Math.PI * 2)
        ctx.fill()
        
        ctx.restore()
      }

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[15] mix-blend-screen"
      style={{ opacity: 0.9 }}
    />
  )
}