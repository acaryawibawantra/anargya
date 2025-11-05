'use client'

import { motion, useSpring } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

type Spec = { label: string; value: string }

export default function CarTiltCard({
  title,
  imageSrc,
  tagline,
  specs = [],
}: {
  title: string
  imageSrc: string
  tagline?: string
  specs?: Spec[]
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  const rotateX = useSpring(0, { stiffness: 180, damping: 18 })
  const rotateY = useSpring(0, { stiffness: 180, damping: 18 })

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    // tilt max 12 derajat
    rotateY.set(px * 12)
    rotateX.set(-py * 12)
  }

  function onMouseLeave() {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group relative rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur shadow-lg shadow-emerald-500/10"
    >
      {/* Container untuk elemen 3D (gambar) */}
      <div style={{ perspective: '1000px' }}>
        <motion.div
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="relative h-48 w-full overflow-hidden rounded-xl sm:h-64"
        >
          {/* Shine overlay */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100"
            style={{ transform: 'translateZ(40px)' }}
          >
            <div className="absolute -top-1/2 left-0 h-[200%] w-full rotate-45 bg-gradient-to-r from-white/10 via-transparent to-transparent" />
          </div>

          {/* Image */}
          <div
            className="relative h-full w-full"
            style={{ transform: 'translateZ(20px)' }}
          >
            <Image src={imageSrc} alt={title} fill className="object-contain" priority />
          </div>
        </motion.div>
      </div>

      {/* Konten teks (statis, di luar motion.div) */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {tagline && <p className="mt-1 text-sm text-gray-400">{tagline}</p>}
        {specs.length > 0 && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {specs.map((s, i) => (
              <div
                key={i}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-300"
              >
                <span className="text-white">{s.value}</span> <span className="text-gray-400">• {s.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}