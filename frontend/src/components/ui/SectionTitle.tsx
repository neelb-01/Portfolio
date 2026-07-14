import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { fadeSlideUp } from '@/lib/motion'

interface SectionTitleProps {
  label: string
  title: string
  subtitle?: string
  center?: boolean
}

export default function SectionTitle({ label, title, subtitle, center = false }: SectionTitleProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeSlideUp}
      className={`mb-12 md:mb-16 ${center ? 'text-center' : ''}`}
    >
      <p className="section-label">{label}</p>
      <h2 className="section-heading">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-[var(--fg-muted)] max-w-2xl text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
