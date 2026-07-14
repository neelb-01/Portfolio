import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { fadeSlideUp, fadeSlideLeft, staggerContainer } from '@/lib/motion'
import { Brain, Code2, Users } from 'lucide-react'

const HIGHLIGHTS = [
  {
    icon: <Brain size={22} />,
    title: 'AI / ML',
    desc: 'Building intelligent systems — from fine-tuning transformers to deploying models on the edge.',
  },
  {
    icon: <Code2 size={22} />,
    title: 'Full-Stack Dev',
    desc: 'End-to-end engineering: FastAPI backends, React frontends, and everything in between.',
  },
  {
    icon: <Users size={22} />,
    title: 'Workshop Facilitator',
    desc: 'Designed and led 10+ technical workshops for 50–120 students each, on ML and software engineering.',
  },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-80px' })

  return (
    <section id="about" className="relative z-10 section-padding">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeSlideLeft}
          >
            <p className="section-label">About Me</p>
            <h2 className="section-heading mb-6">
              Building at the intersection of{' '}
              <span className="gradient-text italic">intelligence</span> and craft.
            </h2>
            <div className="space-y-4 text-[var(--fg-muted)] leading-relaxed text-lg">
              <p>
                I'm a Computer Engineering student passionate about making machines smarter and
                software more human. My work spans research-level ML (transformer fine-tuning, vector
                search, on-device inference) and production full-stack systems.
              </p>
              <p>
                Beyond building, I teach — I've designed curriculum and facilitated workshops that
                have introduced hundreds of students to PyTorch, LLMs, and modern web development.
                Teaching sharpens my own understanding as much as it helps others.
              </p>
              <p>
                I'm looking for opportunities where I can contribute meaningfully to AI/ML products,
                ship reliable software, and keep learning from great engineers.
              </p>
            </div>
          </motion.div>

          {/* Cards */}
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid gap-4"
          >
            {HIGHLIGHTS.map((h) => (
              <motion.div
                key={h.title}
                variants={fadeSlideUp}
                className="glass-hover rounded-xl p-5 flex gap-4 items-start"
              >
                <div className="shrink-0 w-10 h-10 rounded-lg bg-[var(--node)]/10 flex items-center 
                                justify-center text-[var(--node)]">
                  {h.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--fg)] mb-1">{h.title}</h3>
                  <p className="text-sm text-[var(--fg-muted)] leading-relaxed">{h.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
