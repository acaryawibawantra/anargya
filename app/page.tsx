'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/navbar'
import NOSCursorEffect from '@/components/NOSCursorEffect'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

function AnimatedStat({ value, label }: { value: number; label: string }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    let start: number | null = null
    let raf = 0
    const duration = 1200 // ms

    const step = (ts: number) => {
      if (start === null) start = ts
      const progress = (ts - start) / duration
      const next = Math.min(Math.floor(progress * value), value)
      setDisplay(next)
      if (progress < 1) raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [value])

  return (
    <div className="text-center">
      <h3 className="text-4xl font-bold text-primary glow-text">{display}+</h3>
      <p className="text-gray-500 text-sm">{label}</p>
    </div>
  )
}

export default function Home() {

  const cars = [
    {
      name: 'FSJ2019 EV Formula',
      type: 'Formula Electric',
      power: '25kW',
      speed: '140 km/h',
      image: '/images/img2.jpg'
    },
    {
      name: 'MARK 2.0',
      type: 'Formula Electric',
      power: '35kW',
      speed: '165 km/h',
      image: '/images/mark20.png'
    },
    {
      name: 'MARK 3.0',
      type: 'Formula Electric',
      power: '40kW',
      speed: '180 km/h',
      image: '/images/mark30.png'
    }
  ]

  return (
    <main className="min-h-screen bg-dark overflow-hidden">
      <Navbar />
      <NOSCursorEffect />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Background video dan overlay */}
        <div className="absolute inset-0 z-0">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/team.jpg"
          >
            <source src="/images/vidio.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/80 z-10" />
        </div>

        <div className="container mx-auto pt-20 relative z-20">
          {/* Centered hero content to match design */}
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl sm:text-7xl lg:text-7xl font-extrabold tracking-tight mb-8">
              <span className="text-white">ALWAYS</span>{' '}
              <span className="text-primary glow-text">ENERGIZED</span>
            </h1>

            <p className="text-gray-300 text-sm sm:text-xl mb-10">
              Experience the future of automotive excellence with cutting-edge electric vehicles
              designed for performance, innovation, and sustainability.
            </p>

            {/* CTA pills */}
            <div className="flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-6 mb-10">
              <a
                href="#showcase"
                className="bg-primary text-dark font-semibold px-6 py-3 text-sm sm:px-10 sm:py-4 sm:text-base rounded-full transition-all hover:scale-105"
              >
                Explore Showcase
              </a>
              <Link
                href="/products"
                className="bg-primary text-dark font-semibold px-6 py-3 text-sm sm:px-10 sm:py-4 sm:text-base rounded-full transition-all hover:scale-105"
              >
                View Products
              </Link>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-8 pt-20 justify-center">
              <AnimatedStat value={10} label="Total Cars" />
              <AnimatedStat value={15} label="Total Awards" />
              <AnimatedStat value={7} label="Year Founded" />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-6  transform  justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1 h-3 bg-primary rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Car Showcase Section */}
      <section id="showcase" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-gradient">OUR FLEET</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Discover our lineup of high-performance electric vehicles engineered for speed and sustainability
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car, index) => (
              <motion.div
                key={car.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-dark-light rounded-2xl overflow-hidden card-glow group"
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-light to-transparent" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-primary mb-2">{car.name}</h3>
                  <p className="text-gray-400 mb-4">{car.type}</p>
                  
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="text-gray-500">Power</p>
                      <p className="text-white font-semibold">{car.power}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Top Speed</p>
                      <p className="text-white font-semibold">{car.speed}</p>
                    </div>
                  </div>

                  <button className="w-full mt-6 bg-primary/10 hover:bg-primary text-primary hover:text-dark font-semibold py-3 rounded-lg transition-all">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-dark-light">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                <span className="text-gradient">ABOUT ANARGYA</span>
              </h2>
              <p className="text-gray-400 text-lg mb-6">
                Anargya, meaning "infinite value" in Sanskrit, is ITS's premier electric vehicle research team. We're passionate about pushing the boundaries of automotive innovation and sustainable mobility.
              </p>
              <p className="text-gray-400 text-lg mb-6">
                Our team of dedicated students and engineers work tirelessly to design, build, and race cutting-edge electric formula cars in international competitions.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-dark px-6 py-3 rounded-full border border-primary/30">
                  <span className="text-primary font-semibold">#AlwaysEnergized</span>
                </div>
                <div className="bg-dark px-6 py-3 rounded-full border border-primary/30">
                  <span className="text-primary font-semibold">#FormulaStudent</span>
                </div>
                <div className="bg-dark px-6 py-3 rounded-full border border-primary/30">
                  <span className="text-primary font-semibold">#ElectricVehicle</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src="/images/team.jpg"
                alt="Team Anargya"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark border-t border-dark-lighter py-8 px-4">
        <div className="container mx-auto text-center text-gray-500">
          <p>&copy; 2025 Anargya ITS. Always Energized.</p>
        </div>
      </footer>
    </main>
  )
}
