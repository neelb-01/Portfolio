import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionTitle from '@/components/ui/SectionTitle'
import { fetchSkills } from '@/lib/api'
import { staggerContainer, fadeSlideUp } from '@/lib/motion'
import type { Skill } from '@/types'

const CATEGORY_META: Record<string, { label: string; color: string }> = {
  ML_AI: { label: 'ML / AI', color: 'var(--node)' },
  Backend: { label: 'Backend', color: 'var(--synapse)' },
  Frontend: { label: 'Frontend', color: '#f97316' },
  Tools: { label: 'Tools', color: '#a78bfa' },
}

function SkillBar({ skill }: { skill: Skill }) {
  const barRef = useRef<HTMLDivElement>(null)
  const barInView = useInView(barRef, { once: true, margin: '-20px' })
  const color = CATEGORY_META[skill.category]?.color ?? 'var(--node)'

  return (
    <div ref={barRef} className="group">
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-mono text-sm text-[var(--fg)]">{skill.name}</span>
        <span className="font-mono text-xs text-[var(--fg-muted)]">{skill.level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: barInView ? `${skill.level}%` : 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        />
      </div>
    </div>
  )
}

function CategoryBlock({
  category,
  skills,
}: {
  category: string
  skills: Skill[]
}) {
  const meta = CATEGORY_META[category] ?? { label: category, color: 'var(--node)' }
  return (
    <motion.div variants={fadeSlideUp} className="glass rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-5">
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: meta.color, boxShadow: `0 0 8px ${meta.color}` }}
          aria-hidden="true"
        />
        <h3 className="font-mono text-sm font-semibold text-[var(--fg)]">{meta.label}</h3>
      </div>
      <div className="space-y-4">
        {skills.map((s) => (
          <SkillBar key={s.id} skill={s} />
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)

  // Attach to the section element (always mounted)
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-40px' })

  useEffect(() => {
    fetchSkills()
      .then(setSkills)
      .finally(() => setLoading(false))
  }, [])

  const grouped = skills.reduce<Record<string, Skill[]>>((acc, s) => {
    ;(acc[s.category] ??= []).push(s)
    return acc
  }, {})

  const categories = ['ML_AI', 'Backend', 'Frontend', 'Tools']

  return (
    <section ref={sectionRef} id="skills" className="relative z-10 section-padding">
      <div className="section-container">
        <SectionTitle
          label="// skills"
          title="What I work with"
        />

        {loading && (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 rounded-full border-2 border-[var(--node)] border-t-transparent animate-spin" />
          </div>
        )}

        {!loading && (
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5"
          >
            {categories.map((cat) =>
              grouped[cat] ? (
                <CategoryBlock
                  key={cat}
                  category={cat}
                  skills={grouped[cat]}
                />
              ) : null
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}

