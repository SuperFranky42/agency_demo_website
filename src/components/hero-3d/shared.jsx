import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const ACCENT = '#f04e0f'

export function LabelText({ title, sub, align = 'center', accent = false }) {
  const shift = align === 'left' ? '' : align === 'right' ? '-translate-x-full' : '-translate-x-1/2'
  return (
    <div className={`${shift} -translate-y-1/2 whitespace-nowrap rounded-lg bg-ink/80 px-3 py-1.5 text-center shadow-[0_8px_20px_rgba(0,0,0,0.55)] ring-1 ring-white/15 backdrop-blur-sm`}>
      <p className={`text-sm font-bold leading-none tracking-tight sm:text-base ${accent ? 'text-accent' : 'text-white'}`}>{title}</p>
      {sub && <p className="mt-1 text-xs font-medium leading-none text-white/90">{sub}</p>}
    </div>
  )
}

/**
 * HTML overlay for 3D labels. Render <LabelLayer> next to the <Canvas> and
 * <LabelProjector> inside the same 3D group the label positions are relative to.
 */
export function LabelLayer({ items, els }) {
  return items.map((item, i) => (
    <div
      key={item.id}
      ref={(el) => {
        els.current[i] = el
      }}
      className="pointer-events-none absolute left-0 top-0 opacity-0 transition-opacity duration-500"
    >
      {item.content}
    </div>
  ))
}

export function LabelProjector({ items, els }) {
  const anchor = useRef()
  const v = useMemo(() => new THREE.Vector3(), [])
  useFrame(({ camera, size }) => {
    items.forEach((item, i) => {
      const el = els.current[i]
      if (!el || !anchor.current) return
      v.set(...item.position).applyMatrix4(anchor.current.matrixWorld).project(camera)
      el.style.transform = `translate3d(${((v.x + 1) / 2) * size.width}px, ${((1 - v.y) / 2) * size.height}px, 0)`
      el.style.opacity = '1'
    })
  })
  return <group ref={anchor} />
}

export function ParallaxGroup({ children, strength = 0.25, baseRotation = [0, 0, 0], spin = 0 }) {
  const ref = useRef()
  useFrame((state, delta) => {
    const g = ref.current
    if (!g) return
    const targetX = baseRotation[0] - state.pointer.y * strength * 0.5
    const targetY = baseRotation[1] + state.pointer.x * strength + (spin ? Math.sin(state.clock.elapsedTime * spin) * 0.15 : 0)
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 3, delta)
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, 3, delta)
  })
  return (
    <group ref={ref} rotation={baseRotation}>
      {children}
    </group>
  )
}

export function PulseRing({ position, color = ACCENT, size = 0.25, delay = 0, rotation = [-Math.PI / 2, 0, 0] }) {
  const ref = useRef()
  useFrame((state) => {
    const t = ((state.clock.elapsedTime + delay) % 2.4) / 2.4
    ref.current.scale.setScalar(1 + t * 2.2)
    ref.current.material.opacity = (1 - t) * 0.8
  })
  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <ringGeometry args={[size, size + 0.03, 48]} />
      <meshBasicMaterial color={color} transparent side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  )
}

export function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.32} />
      <hemisphereLight skyColor="#fff6f1" groundColor="#1a0904" intensity={0.55} />
      <directionalLight position={[5, 8, 4]} intensity={1.7} color="#fff8f4" />
      <directionalLight position={[-6, 2, -3]} intensity={0.45} color="#ffb089" />
      <pointLight position={[2.2, 1.6, 1.4]} intensity={18} color={ACCENT} distance={10} decay={2} />
      <pointLight position={[-2.4, 0.4, 1.6]} intensity={5} color="#ffffff" distance={8} decay={2} />
    </>
  )
}
