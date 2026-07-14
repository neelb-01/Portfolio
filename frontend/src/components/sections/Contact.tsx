import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import { submitContact } from '@/lib/api'
import { fadeSlideUp, staggerContainer } from '@/lib/motion'
import type { ContactRequest } from '@/types'
import axios from 'axios'

type Status = 'idle' | 'loading' | 'success' | 'error'

const INITIAL: ContactRequest = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState<ContactRequest>(INITIAL)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const ref = useRef(null)
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-60px' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setFieldErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    setFieldErrors({})

    try {
      await submitContact(form)
      setStatus('success')
      setForm(INITIAL)
    } catch (err) {
      setStatus('error')
      if (axios.isAxiosError(err) && err.response) {
        const data = err.response.data
        // Pydantic 422 validation errors
        if (Array.isArray(data?.detail)) {
          const errs: Record<string, string> = {}
          for (const d of data.detail) {
            const field = d.loc?.[d.loc.length - 1] ?? 'form'
            errs[field] = d.msg
          }
          setFieldErrors(errs)
          setErrorMsg('Please fix the errors above.')
        } else {
          setErrorMsg(data?.detail ?? 'Something went wrong. Please try again.')
        }
      } else {
        setErrorMsg('Could not reach the server. Is the backend running?')
      }
    }
  }

  const inputClass = (field: string) =>
    `w-full bg-[var(--bg-3)] border rounded-lg px-4 py-3 text-[var(--fg)] 
     placeholder:text-[var(--fg-muted)]/60 outline-none transition-all duration-200
     focus:ring-2 focus:ring-[var(--node)] focus:border-transparent font-sans text-sm
     ${fieldErrors[field] ? 'border-red-500' : 'border-[var(--border)] hover:border-[var(--node)]/50'}`

  return (
    <section id="contact" className="relative z-10 section-padding">
      <div className="section-container max-w-3xl mx-auto">
        <SectionTitle
          label="// contact"
          title="Let's work together"
          subtitle="Have a project in mind, a question, or just want to say hi? I'd love to hear from you."
          center
        />

        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-10 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
              className="w-16 h-16 rounded-full bg-[var(--node)]/10 flex items-center justify-center 
                         mx-auto mb-4 text-[var(--node)]"
            >
              <CheckCircle size={32} />
            </motion.div>
            <h3 className="font-serif text-2xl font-bold text-[var(--fg)] mb-2">Message sent!</h3>
            <p className="text-[var(--fg-muted)]">
              Thanks for reaching out. I'll get back to you as soon as possible.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-6 btn-ghost"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            ref={ref}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            onSubmit={handleSubmit}
            noValidate
            className="glass rounded-2xl p-6 md:p-10 space-y-5"
            aria-label="Contact form"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <motion.div variants={fadeSlideUp}>
                <label htmlFor="name" className="block font-mono text-xs text-[var(--fg-muted)] mb-1.5">
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={inputClass('name')}
                  aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                />
                {fieldErrors.name && (
                  <p id="name-error" className="text-red-400 text-xs mt-1">{fieldErrors.name}</p>
                )}
              </motion.div>

              <motion.div variants={fadeSlideUp}>
                <label htmlFor="email" className="block font-mono text-xs text-[var(--fg-muted)] mb-1.5">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={inputClass('email')}
                  aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                />
                {fieldErrors.email && (
                  <p id="email-error" className="text-red-400 text-xs mt-1">{fieldErrors.email}</p>
                )}
              </motion.div>
            </div>

            <motion.div variants={fadeSlideUp}>
              <label htmlFor="subject" className="block font-mono text-xs text-[var(--fg-muted)] mb-1.5">
                Subject *
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                value={form.subject}
                onChange={handleChange}
                placeholder="What's this about?"
                className={inputClass('subject')}
                aria-describedby={fieldErrors.subject ? 'subject-error' : undefined}
              />
              {fieldErrors.subject && (
                <p id="subject-error" className="text-red-400 text-xs mt-1">{fieldErrors.subject}</p>
              )}
            </motion.div>

            <motion.div variants={fadeSlideUp}>
              <label htmlFor="message" className="block font-mono text-xs text-[var(--fg-muted)] mb-1.5">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project or question..."
                className={`${inputClass('message')} resize-none`}
                aria-describedby={fieldErrors.message ? 'message-error' : undefined}
              />
              {fieldErrors.message && (
                <p id="message-error" className="text-red-400 text-xs mt-1">{fieldErrors.message}</p>
              )}
            </motion.div>

            {errorMsg && status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2.5 text-red-400 bg-red-500/10 border border-red-500/20 
                           rounded-lg p-3.5 text-sm"
                role="alert"
              >
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                {errorMsg}
              </motion.div>
            )}

            <motion.div variants={fadeSlideUp}>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary w-full sm:w-auto justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                aria-busy={status === 'loading'}
              >
                {status === 'loading' ? (
                  <>
                    <Loader size={16} className="animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    <Send size={16} /> Send Message
                  </>
                )}
              </button>
            </motion.div>
          </motion.form>
        )}
      </div>
    </section>
  )
}
