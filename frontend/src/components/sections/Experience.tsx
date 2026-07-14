import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Trophy, FlaskConical, Presentation, MapPin, Calendar } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import { fetchExperience } from '@/lib/api'
import { staggerContainer, fadeSlideUp } from '@/lib/motion'
import type { Experience } from '@/types'

const TYPE_META: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
  hackathon: {
    icon: <Trophy size={14} />,
    label: 'Hackathon',
    color: 'text-[var(--synapse)] border-[var(--synapse)]/40 bg-[var(--synapse)]/10',
  },
  research: {
    icon: <FlaskConical size={14} />,
    label: 'Research',
    color: 'text-[var(--node)] border-[var(--node)]/40 bg-[var(--node)]/10',
  },
  workshop: {
    icon: <Presentation size={14} />,
    label: 'Workshop',
    color: 'text-orange-400 border-orange-400/40 bg-orange-400/10',
  },
}

function TimelineCard({
  experience,
  index,
}: {
  experience: Experience
  index: number
}) {
  const meta = TYPE_META[experience.type] ?? TYPE_META.research
  const isLeft = index % 2 === 0

  return (
    <motion.div
      variants={fadeSlideUp}
      className={`relative flex flex-col md:flex-row gap-4 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Line dot */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-6 z-10">
        <div className="w-3 h-3 rounded-full bg-[var(--node)] shadow-[0_0_12px_var(--node)]" />
      </div>

      {/* Spacer */}
      <div className="hidden md:block w-1/2" />

      {/* Card */}
      <div className={`md:w-1/2 ${isLeft ? 'md:pl-8' : 'md:pr-8'}`}>
        <div className="glass-hover rounded-2xl p-5">
          {/* Type badge */}
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 
                        rounded-full border mb-3 ${meta.color}`}
          >
            {meta.icon} {meta.label}
          </span>

          <h3 className="font-serif text-lg font-bold text-[var(--fg)] mb-0.5">{experience.title}</h3>
          <p className="font-medium text-[var(--node)] text-sm mb-2">{experience.organization}</p>

          <div className="flex flex-wrap gap-3 text-xs text-[var(--fg-muted)] font-mono mb-3">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {experience.start_date}
              {experience.end_date ? ` — ${experience.end_date}` : ''}
            </span>
            {experience.location && (
              <span className="flex items-center gap-1">
                <MapPin size={12} />
                {experience.location}
              </span>
            )}
          </div>

          <p className="text-sm text-[var(--fg-muted)] leading-relaxed">{experience.description}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const ref = useRef(null)
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-60px' })

  useEffect(() => {
    fetchExperience()
      .then(setExperiences)
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="experience" className="relative z-10 section-padding bg-[var(--bg-2)]/50">
      <div className="section-container">
        <SectionTitle
          label="// experience"
          title="Timeline"
          subtitle="Hackathons, research, and workshops — where I've applied and grown."
        />

        {loading && (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 rounded-full border-2 border-[var(--node)] border-t-transparent animate-spin" />
          </div>
        )}

        {!loading && (
          <div className="relative">
            {/* Vertical line */}
            <div className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-[var(--node)] via-[var(--border)] to-transparent" aria-hidden="true" />
            {/* Mobile line */}
            <div className="md:hidden absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--node)] via-[var(--border)] to-transparent" aria-hidden="true" />

            <motion.div
              ref={ref}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={staggerContainer}
              className="space-y-8 md:space-y-12 pl-10 md:pl-0"
            >
              {experiences.map((exp, i) => (
                <TimelineCard key={exp.id} experience={exp} index={i} />
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}
