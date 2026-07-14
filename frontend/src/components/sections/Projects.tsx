import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { GitBranch, ExternalLink, Star } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import Tag from '@/components/ui/Tag'
import ProjectModal from '@/components/ui/ProjectModal'
import { fetchProjects } from '@/lib/api'
import { staggerContainer, scaleIn } from '@/lib/motion'
import type { Project } from '@/types'

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <motion.article
      variants={scaleIn}
      className="glass-hover rounded-2xl p-6 flex flex-col gap-4 cursor-pointer group"
      onClick={onOpen}
      onKeyDown={(e) => e.key === 'Enter' && onOpen()}
      tabIndex={0}
      role="button"
      aria-label={`View case study for ${project.title}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          {project.featured === 1 && (
            <Star size={14} className="text-[var(--synapse)] fill-[var(--synapse)] shrink-0" />
          )}
          <h3 className="font-serif text-xl font-bold text-[var(--fg)] group-hover:text-[var(--node)] transition-colors">
            {project.title}
          </h3>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[var(--fg-muted)] hover:text-[var(--node)] transition-colors"
              aria-label={`GitHub for ${project.title}`}
            >
              <GitBranch size={16} />
            </a>
          )}
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[var(--fg-muted)] hover:text-[var(--node)] transition-colors"
              aria-label={`Live demo for ${project.title}`}
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      <p className="text-[var(--fg-muted)] text-sm leading-relaxed flex-1">{project.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.tech_stack.slice(0, 5).map((t) => <Tag key={t} label={t} />)}
        {project.tech_stack.length > 5 && (
          <span className="tag-pill">+{project.tech_stack.length - 5}</span>
        )}
      </div>

      <p className="font-mono text-xs text-[var(--node)] mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
        Click to read case study →
      </p>
    </motion.article>
  )
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<Project | null>(null)

  const ref = useRef(null)
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-60px' })

  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .catch(() => setError('Failed to load projects. Is the backend running?'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="projects" className="relative z-10 section-padding bg-[var(--bg-2)]/50">
      <div className="section-container">
        <SectionTitle
          label="// projects"
          title="Things I've built"
          subtitle="A selection of projects across ML systems, full-stack apps, and everything in between."
        />

        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-[var(--node)] border-t-transparent animate-spin" />
          </div>
        )}

        {error && (
          <p className="text-center font-mono text-sm text-red-400 py-12">{error}</p>
        )}

        {!loading && !error && (
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={() => setSelected(project)}
              />
            ))}
          </motion.div>
        )}

        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      </div>
    </section>
  )
}
