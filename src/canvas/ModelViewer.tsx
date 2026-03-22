import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}

export default function ModelViewer({ url }: { url: string }) {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 45 }} style={{ width: '100%', height: '100%' }}>
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
      <Suspense fallback={null}>
        <Model url={url} />
      </Suspense>
      <OrbitControls enablePan={false} autoRotate autoRotateSpeed={1} />
    </Canvas>
  )
}
