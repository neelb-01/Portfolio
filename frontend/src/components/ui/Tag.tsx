interface TagProps {
  label: string
  highlight?: boolean
}

export default function Tag({ label, highlight = false }: TagProps) {
  return (
    <span
      className={`tag-pill ${highlight ? 'border-[var(--node)] text-[var(--node)]' : ''}`}
    >
      {label}
    </span>
  )
}
