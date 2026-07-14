import { GitBranch, Link2, Mail } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative z-10 border-t border-[var(--border)] py-10">
      <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-sm text-[var(--fg-muted)]">
          © {year} <span className="gradient-text font-semibold">Samarth Kale</span>. Built with FastAPI + React.
        </p>
        <div className="flex items-center gap-4">
          {[
            { icon: <GitBranch size={18} />, href: 'https://github.com/yourusername', label: 'GitHub' },
            { icon: <Link2 size={18} />, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
            { icon: <Mail size={18} />, href: '#contact', label: 'Email' },
          ].map(({ icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={label}
              className="text-[var(--fg-muted)] hover:text-[var(--node)] transition-colors"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
