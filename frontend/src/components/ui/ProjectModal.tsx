import { AnimatePresence, motion } from 'framer-motion'
import { X, GitBranch, ExternalLink } from 'lucide-react'
import type { Project } from '@/types'
import Tag from './Tag'
import { modalVariant, overlayVariant } from '@/lib/motion'

interface Props {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: Props) {
  if (!project) return null

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="overlay"
            variants={overlayVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            variants={modalVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed z-50 inset-4 md:inset-auto md:top-1/2 md:left-1/2 
                       md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl 
                       glass rounded-2xl p-6 md:p-8 overflow-y-auto max-h-[90vh]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg text-[var(--fg-muted)] 
                         hover:text-[var(--fg)] hover:bg-[var(--bg-3)] transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="pr-8">
              <p className="section-label mb-1">Case Study</p>
              <h3 className="font-serif text-3xl font-bold text-[var(--fg)] mb-4">{project.title}</h3>

              <p className="text-[var(--fg-muted)] leading-relaxed mb-6">
                {project.long_description || project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech_stack.map((t) => <Tag key={t} label={t} />)}
              </div>

              <div className="flex flex-wrap gap-3">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                  >
                    <GitBranch size={16} /> GitHub
                  </a>
                )}
                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <ExternalLink size={16} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
