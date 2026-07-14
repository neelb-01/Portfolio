import { motion } from 'framer-motion'
import { letterVariant, staggerFast, fadeSlideUp } from '@/lib/motion'
import { ArrowDown } from 'lucide-react'

const NAME = 'Samarth Kale'
const TAGLINE = 'Computer Engineer · AI/ML · Full-Stack · Workshop Facilitator'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center section-container"
      aria-label="Hero"
    >
      {/* Subtle background ring */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-[600px] h-[600px] rounded-full border border-[var(--node)]/5 animate-pulse-slow" />
        <div className="absolute w-[350px] h-[350px] rounded-full border border-[var(--node)]/8 animate-pulse-slow animation-delay-400" />
      </div>

      <div className="relative">
        {/* Mono label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="section-label mb-6"
        >
          ⟨ portfolio ⟩
        </motion.p>

        {/* Name — letter by letter */}
        <motion.h1
          variants={staggerFast}
          initial="hidden"
          animate="visible"
          transition={{ delayChildren: 0.4 }}
          className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-none 
                     text-[var(--fg)] mb-6 flex flex-wrap justify-center gap-x-[0.08em]"
          aria-label={NAME}
        >
          {NAME.split('').map((char, i) => (
            <motion.span
              key={i}
              variants={letterVariant}
              className={char === ' ' ? 'w-[0.3em]' : 'inline-block'}
              aria-hidden="true"
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Tagline with typewriter cursor */}
        <motion.div
          variants={fadeSlideUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.0 }}
          className="flex items-center justify-center gap-1 mb-10"
        >
          <p className="font-mono text-sm sm:text-base text-[var(--fg-muted)] tracking-wide">
            {TAGLINE}
          </p>
          <span className="inline-block w-0.5 h-5 bg-[var(--node)] animate-blink ml-1" aria-hidden="true" />
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={fadeSlideUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="btn-primary"
          >
            View Projects
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="btn-ghost"
          >
            Get In Touch
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.8 }}
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center 
                   gap-2 text-[var(--fg-muted)] hover:text-[var(--node)] transition-colors group"
        aria-label="Scroll to About section"
      >
        <span className="font-mono text-xs tracking-widest">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  )
}
