import { Link } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { Float, Text, Center } from '@react-three/drei'

function FloatingInitials() {
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
      <Center>
        <Text
          fontSize={1.1}
          color="#7c6ef5"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#1a1a2e"
        >
          NF
        </Text>
      </Center>
    </Float>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      {/* 3D accent */}
      <div className="w-48 h-48 md:w-64 md:h-64 mb-8">
        <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={1.5} color="#e05cff" />
          <pointLight position={[-5, -5, 5]} intensity={1} color="#7c6ef5" />
          <FloatingInitials />
        </Canvas>
      </div>

      <div className="max-w-2xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
          Hi, I'm{' '}
          <span className="text-gradient">Nick Feffer</span>
        </h1>
        <p className="text-lg md:text-xl text-[var(--color-muted)] mb-8 leading-relaxed">
          Software engineer &amp; creative developer. I build interactive
          experiences, tools, and systems — from shaders to product.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/projects"
            className="px-6 py-3 rounded-full text-sm font-medium text-white transition-all duration-200 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-2))',
            }}
          >
            View my work
          </Link>
          <Link
            to="/contact"
            className="px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 glass hover:border-[var(--color-accent)]"
            style={{ color: 'var(--color-text)' }}
          >
            Get in touch
          </Link>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-10 flex flex-col items-center gap-2 text-[var(--color-muted)] text-xs">
        <span>scroll</span>
        <span className="animate-bounce">↓</span>
      </div>
    </main>
  )
}
