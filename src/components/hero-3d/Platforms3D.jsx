import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { ACCENT, LabelLayer, LabelProjector, LabelText, ParallaxGroup, PulseRing, SceneLights } from './shared.jsx'

const PLATFORMS = [
  { pos: [-1.35, -0.42, 0.22], title: 'Found', sub: 'Content and ads' },
  { pos: [0, 0.12, 0], title: 'Lead', sub: 'Website and funnel' },
  { pos: [1.35, 0.66, -0.22], title: 'Booked', sub: 'AI follow-up', accent: true },
]
const HOPS = 8
const white = new THREE.Color('#ffffff')
const orange = new THREE.Color(ACCENT)

function glowMap() {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  const grd = ctx.createRadialGradient(128, 128, 8, 128, 128, 128)
  grd.addColorStop(0, 'rgba(255,255,255,0.95)')
  grd.addColorStop(0.18, 'rgba(255,170,120,0.55)')
  grd.addColorStop(0.45, 'rgba(240,78,15,0.18)')
  grd.addColorStop(1, 'rgba(240,78,15,0)')
  ctx.fillStyle = grd
  ctx.fillRect(0, 0, 256, 256)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

const GLOW = glowMap()
const noRaycast = () => null

function topOf(p) {
  return new THREE.Vector3(p.pos[0], p.pos[1] + 0.28, p.pos[2])
}

function Hoppers() {
  const core = useRef()
  const halo = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const color = useMemo(() => new THREE.Color(), [])
  const tops = useMemo(() => PLATFORMS.map(topOf), [])
  const tmp = useMemo(() => new THREE.Vector3(), [])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    for (let i = 0; i < HOPS; i++) {
      const t = (time * 0.16 + i / HOPS) % 1
      const seg = t < 0.5 ? 0 : 1
      const k = (t - seg * 0.5) / 0.5
      const eased = k * k * (3 - 2 * k)
      tmp.lerpVectors(tops[seg], tops[seg + 1], eased)
      tmp.y += Math.sin(k * Math.PI) * 1.05
      const scale = 0.085 * Math.min(1, Math.sin(t * Math.PI) * 2.4)
      dummy.position.copy(tmp)
      dummy.scale.setScalar(scale)
      dummy.updateMatrix()
      core.current.setMatrixAt(i, dummy.matrix)
      core.current.setColorAt(i, color.copy(white).lerp(orange, t))
      dummy.scale.setScalar(scale * 2.1)
      dummy.updateMatrix()
      halo.current.setMatrixAt(i, dummy.matrix)
    }
    core.current.instanceMatrix.needsUpdate = true
    halo.current.instanceMatrix.needsUpdate = true
    if (core.current.instanceColor) core.current.instanceColor.needsUpdate = true
  })

  return (
    <>
      <instancedMesh ref={halo} args={[null, null, HOPS]} raycast={noRaycast}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.28} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
      </instancedMesh>
      <instancedMesh ref={core} args={[null, null, HOPS]} raycast={noRaycast}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
    </>
  )
}

function Trails() {
  const curves = useMemo(() => {
    const tops = PLATFORMS.map(topOf)
    return [0, 1].map((i) => {
      const mid = tops[i].clone().lerp(tops[i + 1], 0.5)
      mid.y += 1.05
      return new THREE.QuadraticBezierCurve3(tops[i], mid, tops[i + 1])
    })
  }, [])

  return curves.map((c, i) => (
    <group key={i}>
      <mesh raycast={noRaycast}>
        <tubeGeometry args={[c, 64, 0.028, 8, false]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.28} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh raycast={noRaycast}>
        <tubeGeometry args={[c, 64, 0.008, 8, false]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.7} toneMapped={false} />
      </mesh>
    </group>
  ))
}

function Motes() {
  const ref = useRef()
  const count = 22
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 5.4,
        y: (Math.random() - 0.35) * 2.6,
        z: -1.6 + Math.random() * 1.4,
        s: 0.008 + Math.random() * 0.014,
        p: Math.random() * Math.PI * 2,
        speed: 0.25 + Math.random() * 0.4,
      })),
    [],
  )
  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    seeds.forEach((m, i) => {
      dummy.position.set(m.x + Math.sin(t * m.speed + m.p) * 0.12, m.y + Math.sin(t * 0.35 + m.p) * 0.18, m.z)
      dummy.scale.setScalar(m.s * (0.7 + Math.sin(t * 1.2 + m.p) * 0.3))
      dummy.updateMatrix()
      ref.current.setMatrixAt(i, dummy.matrix)
    })
    ref.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={ref} args={[null, null, count]} raycast={noRaycast}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color={ACCENT} transparent opacity={0.55} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
    </instancedMesh>
  )
}

function Icon({ index, position }) {
  const ref = useRef()
  useFrame((state, delta) => {
    const node = ref.current
    node.rotation.y += delta * (index === 2 ? 0.9 : 0.55)
    if (index === 1) {
      node.rotation.x = 0
      node.rotation.z = 0
    } else {
      node.rotation.x = Math.sin(state.clock.elapsedTime * 0.6 + index) * 0.15
    }
    node.position.y = position[1] + 0.62 + Math.sin(state.clock.elapsedTime * 1.4 + index) * 0.07
  })
  return (
    <group ref={ref} position={[position[0], position[1] + 0.62, position[2]]}>
      {index === 0 && (
        <mesh>
          <octahedronGeometry args={[0.2, 0]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.25} metalness={0.45} roughness={0.18} flatShading />
        </mesh>
      )}
      {index === 1 && (
        <mesh>
          <octahedronGeometry args={[0.22, 0]} />
          <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={0.55} metalness={0.2} roughness={0.25} flatShading />
        </mesh>
      )}
      {index === 2 && (
        <mesh rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[0.18, 0.055, 20, 48]} />
          <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={0.85} metalness={0.35} roughness={0.15} />
        </mesh>
      )}
    </group>
  )
}

function Platform({ p, index }) {
  const accent = index === 2
  const rig = useRef()
  const hovered = useRef(false)
  const gl = useThree((state) => state.gl)

  useFrame((_, delta) => {
    const node = rig.current
    if (!node) return
    const scale = THREE.MathUtils.damp(node.scale.x, hovered.current ? 1.08 : 1, 9, delta)
    const lift = THREE.MathUtils.damp(node.position.y, hovered.current ? 0.1 : 0, 9, delta)
    node.scale.setScalar(scale)
    node.position.y = lift
  })

  const cursor = (next) => {
    const el = gl.domElement
    if (el.dataset.dragging === '1') return
    el.style.cursor = next
  }

  return (
    <group position={p.pos}>
      <mesh position={[0, -0.22, 0]} rotation={[-Math.PI / 2, 0, 0]} raycast={noRaycast}>
        <planeGeometry args={[accent ? 2.4 : 1.9, accent ? 2.4 : 1.9]} />
        <meshBasicMaterial map={GLOW} transparent opacity={accent ? 0.7 : 0.38} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
      </mesh>
      <group
        ref={rig}
        onPointerOver={(event) => {
          event.stopPropagation()
          hovered.current = true
          gl.domElement.dataset.hovering = '1'
          cursor('pointer')
        }}
        onPointerOut={(event) => {
          event.stopPropagation()
          hovered.current = false
          delete gl.domElement.dataset.hovering
          cursor('grab')
        }}
      >
        <RoundedBox args={[1.28, 0.28, 1.28]} radius={0.08} smoothness={4}>
          <meshStandardMaterial color={accent ? '#2a120b' : '#141414'} metalness={0.72} roughness={0.22} />
        </RoundedBox>
        <mesh position={[0, 0.145, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.12, 1.12]} />
          <meshStandardMaterial
            color={accent ? ACCENT : '#242424'}
            emissive={accent ? ACCENT : '#000000'}
            emissiveIntensity={accent ? 0.55 : 0}
            metalness={0.35}
            roughness={0.4}
          />
        </mesh>
        <mesh position={[0, 0.152, 0]} rotation={[-Math.PI / 2, 0, 0]} raycast={noRaycast}>
          <ringGeometry args={[0.34, 0.37, 64]} />
          <meshBasicMaterial color={accent ? '#ffffff' : ACCENT} transparent opacity={0.85} toneMapped={false} />
        </mesh>
        <PulseRing position={[0, 0.16, 0]} size={0.34} delay={index * 0.7} color={accent ? '#ffffff' : ACCENT} />
        <Icon index={index} position={[0, 0, 0]} />
      </group>
    </group>
  )
}

function FitCamera() {
  const camera = useThree((state) => state.camera)
  const size = useThree((state) => state.size)
  const target = useMemo(() => new THREE.Vector3(0, -0.15, 0), [])
  const offset = useMemo(() => new THREE.Vector3(), [])

  useLayoutEffect(() => {
    const fov = (camera.fov * Math.PI) / 180
    const aspect = size.width / Math.max(size.height, 1)
    const halfW = 2.55
    const halfH = 2.2
    const tan = Math.tan(fov / 2)
    const distance = Math.max(halfH / tan, halfW / (tan * aspect)) * 1.06
    offset.set(0, 0.38, 1).normalize().multiplyScalar(distance)
    camera.position.copy(target).add(offset)
    camera.lookAt(target)
    camera.updateProjectionMatrix()
  }, [camera, offset, size.height, size.width, target])

  return null
}

const LABELS = PLATFORMS.map((p) => ({
  id: p.title,
  position: [p.pos[0], p.pos[1] - 0.95, p.pos[2] + 0.7],
  content: <LabelText title={p.title} sub={p.sub} accent={p.accent} />,
}))

function RevealWhenDrawn({ onReady }) {
  const sent = useRef(false)
  useFrame(() => {
    if (sent.current) return
    sent.current = true
    requestAnimationFrame(() => {
      requestAnimationFrame(() => onReady())
    })
  })
  return null
}

export default function Platforms3D() {
  const els = useRef([])
  const [ready, setReady] = useState(false)
  return (
    <div className={`hero-scene absolute inset-0${ready ? ' is-ready' : ''}`}>
      <Canvas
        camera={{ position: [0, 2.2, 8], fov: 34 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ touchAction: 'pan-y', width: '100%', height: '100%' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
        }}
      >
        <FitCamera />
        <RevealWhenDrawn onReady={() => setReady(true)} />
        <SceneLights />
        <ParallaxGroup strength={0.62} spin={0.06} orbit>
          <group>
            <Motes />
            {PLATFORMS.map((p, i) => (
              <Platform key={p.title} p={p} index={i} />
            ))}
            <Trails />
            <Hoppers />
            <LabelProjector items={LABELS} els={els} />
          </group>
        </ParallaxGroup>
      </Canvas>
      <LabelLayer items={LABELS} els={els} />
    </div>
  )
}
