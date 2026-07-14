import { lazy, Suspense } from 'react'
import NeuralCanvas from '@/components/canvas/NeuralCanvas'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import { useTheme } from '@/hooks/useTheme'

// Code-split below-fold sections
const About = lazy(() => import('@/components/sections/About'))
const Projects = lazy(() => import('@/components/sections/Projects'))
const Skills = lazy(() => import('@/components/sections/Skills'))
const Experience = lazy(() => import('@/components/sections/Experience'))
const Contact = lazy(() => import('@/components/sections/Contact'))

function SectionLoader() {
  return (
    <div className="flex justify-center py-20">
      <div className="w-6 h-6 rounded-full border-2 border-[var(--node)] border-t-transparent animate-spin" />
    </div>
  )
}

export default function App() {
  const { isDark, toggle } = useTheme()

  return (
    <div className="relative min-h-screen bg-[var(--bg)]">
      {/* Generative neural net background */}
      <NeuralCanvas isDark={isDark} />

      {/* Navigation */}
      <Navbar isDark={isDark} onToggleTheme={toggle} />

      <main id="main-content">
        <Hero />

        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Skills />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Experience />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}
