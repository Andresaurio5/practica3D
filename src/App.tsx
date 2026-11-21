import { useState, useRef } from 'react'
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import type { Mesh } from "three";

function Cubo() {
  const cubo = useRef<Mesh>(null)
  const [color, setColor] = useState('tomato')
  const [encima, setEncima] = useState(false)

  useFrame((_, delta) => {
    if (cubo.current) {
      cubo.current.rotation.x += delta * 0.6
      cubo.current.rotation.y += delta * 0.6
    }
  })

  return (
    <mesh
      ref={cubo}
      position={[0, 0, -3]}
      scale={encima ? 1.5 : 1}
      onPointerOver={() => setEncima(true)}
      onPointerOut={() => setEncima(false)}
      onClick={() => setColor(color === 'tomato' ? 'royalblue' : 'tomato')}
    >
      <coneGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

function Cilindro() {
  const cilindro = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (cilindro.current) {
      cilindro.current.rotation.y += delta * 0.8
      cilindro.current.rotation.x += delta * 0.3
    }
  })

  return (
    <mesh
        ref={cilindro}
        position={[2, 0, -3]}

    >

      <cylinderGeometry />
      <meshStandardMaterial color="green" />
    </mesh>
  )
}

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 0.1] }}>
      <Environment files="360.jpg" background />
      <Cubo />
      <Cilindro />
      <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={-0.4} />
    </Canvas>
  )
}

export default App
