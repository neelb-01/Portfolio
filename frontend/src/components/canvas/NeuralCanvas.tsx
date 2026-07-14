import { useEffect, useRef, useCallback } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  pulsePhase: number
}

const NODE_COUNT = 72
const MAX_DIST = 160
const MOUSE_REPEL_DIST = 120
const MOUSE_REPEL_STRENGTH = 0.35
const DRIFT_SPEED = 0.3

function makeNodes(w: number, h: number): Node[] {
  return Array.from({ length: NODE_COUNT }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * DRIFT_SPEED,
    vy: (Math.random() - 0.5) * DRIFT_SPEED,
    radius: Math.random() * 2 + 1.5,
    pulsePhase: Math.random() * Math.PI * 2,
  }))
}

interface Props {
  isDark: boolean
}

export default function NeuralCanvas({ isDark }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<Node[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const rafRef = useRef<number>(0)
  const timeRef = useRef<number>(0)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY }
  }, [])

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -9999, y: -9999 }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      if (nodesRef.current.length === 0) {
        nodesRef.current = makeNodes(canvas.width, canvas.height)
      }
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    const nodeColor = isDark ? '0, 229, 255' : '0, 140, 160'
    const synapseColor = isDark ? '184, 255, 87' : '80, 150, 0'
    const nodeBgAlpha = isDark ? 0.85 : 0.7
    const edgeMaxAlpha = isDark ? 0.18 : 0.12

    function draw(timestamp: number) {
      if (!canvas || !ctx) return
      const dt = timestamp - timeRef.current
      timeRef.current = timestamp

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const mouse = mouseRef.current
      const nodes = nodesRef.current
      const w = canvas.width
      const h = canvas.height

      // Update node positions
      for (const node of nodes) {
        // Mouse repulsion
        const dx = node.x - mouse.x
        const dy = node.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_REPEL_DIST && dist > 0) {
          const force = ((MOUSE_REPEL_DIST - dist) / MOUSE_REPEL_DIST) * MOUSE_REPEL_STRENGTH
          node.vx += (dx / dist) * force
          node.vy += (dy / dist) * force
        }

        // Dampen velocity
        node.vx *= 0.98
        node.vy *= 0.98
        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy)
        if (speed > DRIFT_SPEED * 4) {
          node.vx = (node.vx / speed) * DRIFT_SPEED * 4
          node.vy = (node.vy / speed) * DRIFT_SPEED * 4
        }

        node.x += node.vx * (dt * 0.06)
        node.y += node.vy * (dt * 0.06)

        // Soft boundary wrap
        if (node.x < -50) node.x = w + 50
        if (node.x > w + 50) node.x = -50
        if (node.y < -50) node.y = h + 50
        if (node.y > h + 50) node.y = -50
      }

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            const alpha = edgeMaxAlpha * (1 - dist / MAX_DIST)
            // Highlight edges near mouse
            const midX = (a.x + b.x) / 2
            const midY = (a.y + b.y) / 2
            const mouseDist = Math.sqrt((midX - mouse.x) ** 2 + (midY - mouse.y) ** 2)
            const mouseBoost = mouseDist < 200 ? (1 - mouseDist / 200) * 0.4 : 0

            // Alternate synapse-colored edges for the ones near mouse
            const edgeAlpha = Math.min(alpha + mouseBoost, 0.6)
            const color = mouseBoost > 0.05 ? synapseColor : nodeColor

            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(${color}, ${edgeAlpha})`
            ctx.lineWidth = mouseBoost > 0.1 ? 1.2 : 0.6
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      const t = timestamp * 0.001
      for (const node of nodes) {
        const pulse = Math.sin(t * 1.2 + node.pulsePhase) * 0.3 + 0.7
        const r = node.radius * pulse

        // Glow
        const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 5)
        grad.addColorStop(0, `rgba(${nodeColor}, ${nodeBgAlpha * pulse})`)
        grad.addColorStop(1, `rgba(${nodeColor}, 0)`)
        ctx.beginPath()
        ctx.arc(node.x, node.y, r * 5, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${nodeColor}, ${nodeBgAlpha})`
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isDark, handleMouseMove, handleMouseLeave])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
      aria-hidden="true"
    />
  )
}
