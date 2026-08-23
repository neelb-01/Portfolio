import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { fadeSlideUp, fadeSlideLeft, staggerContainer } from '@/lib/motion'
import { LineChart, Code2, Wrench } from 'lucide-react'

const HIGHLIGHTS = [
  {
    icon: <Code2 size={22} />,
    title: 'Full-Stack Dev',
    desc: 'End-to-end builds in JavaScript, TypeScript, and Python — Express and FastAPI services behind React and vanilla-JS frontends.',
  },
  {
    icon: <LineChart size={22} />,
    title: 'Data-Driven Projects',
    desc: 'Working with real datasets: an xG model fitted on 88,023 shots, validated against 686 held-out matches.',
  },
  {
    icon: <Wrench size={22} />,
    title: 'Useful Tools',
    desc: 'Practical software that solves an actual problem — match analytics, traceable blood-unit logistics, mobile ordering, chat automation.',
  },
]

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

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
              Turning real <span className="gradient-text italic">data</span> into tools people
              can use.
            </h2>
            <div className="space-y-4 text-[var(--fg-muted)] leading-relaxed text-lg">
              <p>
                I'm a student who enjoys building useful tools and exploring data-driven projects.
                I focus on practical things that solve real problems — an xG engine over 3,464
                football matches, a QR-traced blood donation platform, a native Android cafe app, a
                Discord bot that hot-reloads its own commands.
              </p>
              <p>
                My primary toolkit is JavaScript and TypeScript, with Python close behind. That means
                React and plain HTML/CSS/JS on the frontend, Node with Express or Python with FastAPI
                on the backend, and PostgreSQL or SQLite underneath. More recently I've been building
                natively for Android in Kotlin, with Room for persistence. I like working close to the data
                — fitting a model, validating it honestly, then drawing the result on screen.
              </p>
              <p>
                I'm looking for opportunities to ship reliable software, work on problems that matter,
                and grow alongside stronger engineers.
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
