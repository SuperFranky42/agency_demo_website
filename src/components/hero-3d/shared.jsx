import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
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

const YAW_LIMIT = 1.05
const PITCH_MIN = -0.48
const PITCH_MAX = 0.38

export function ParallaxGroup({ children, strength = 0.25, baseRotation = [0, 0, 0], spin = 0, orbit = false }) {
  const ref = useRef()
  const gl = useThree((state) => state.gl)
  const drag = useRef({
    active: false,
    id: null,
    lastX: 0,
    lastY: 0,
    lastT: 0,
    yaw: 0,
    pitch: 0,
    velYaw: 0,
    velPitch: 0,
    held: false,
  })
  const reduceMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  useEffect(() => {
    if (!orbit) return undefined
    const el = gl.domElement
    el.style.cursor = 'grab'

    const onDown = (event) => {
      if (event.button !== 0) return
      const d = drag.current
      const node = ref.current
      d.active = true
      d.held = true
      d.id = event.pointerId
      d.lastX = event.clientX
      d.lastY = event.clientY
      d.lastT = performance.now()
      d.velYaw = 0
      d.velPitch = 0
      if (node) {
        d.yaw = node.rotation.y - baseRotation[1]
        d.pitch = node.rotation.x - baseRotation[0]
      }
      el.dataset.dragging = '1'
      el.style.cursor = 'grabbing'
      try {
        el.setPointerCapture(event.pointerId)
      } catch {
        // The pointer can already be gone if the gesture ends immediately.
      }
    }

    const onMove = (event) => {
      const d = drag.current
      if (!d.active || event.pointerId !== d.id) return
      const now = performance.now()
      const dt = Math.max((now - d.lastT) / 1000, 1 / 120)
      const width = Math.max(el.clientWidth, 1)
      const height = Math.max(el.clientHeight, 1)
      const yaw = -((event.clientX - d.lastX) / width) * 2.6
      const pitch = ((event.clientY - d.lastY) / height) * 1.15
      d.lastX = event.clientX
      d.lastY = event.clientY
      d.lastT = now
      d.yaw = THREE.MathUtils.clamp(d.yaw + yaw, -YAW_LIMIT, YAW_LIMIT)
      d.pitch = THREE.MathUtils.clamp(d.pitch + pitch, PITCH_MIN, PITCH_MAX)
      d.velYaw = Math.abs(d.yaw) >= YAW_LIMIT ? 0 : yaw / dt
      d.velPitch = d.pitch <= PITCH_MIN || d.pitch >= PITCH_MAX ? 0 : pitch / dt
    }

    const endDrag = (event) => {
      const d = drag.current
      if (!d.active || event.pointerId !== d.id) return
      d.active = false
      d.id = null
      if (performance.now() - d.lastT > 80) {
        d.velYaw = 0
        d.velPitch = 0
      }
      try {
        if (el.hasPointerCapture(event.pointerId)) el.releasePointerCapture(event.pointerId)
      } catch {
        // Ended pointers are no longer captured.
      }
      delete el.dataset.dragging
      el.style.cursor = el.dataset.hovering === '1' ? 'pointer' : 'grab'
    }

    el.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', endDrag)
    window.addEventListener('pointercancel', endDrag)
    return () => {
      delete el.dataset.dragging
      el.style.cursor = ''
      el.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', endDrag)
      window.removeEventListener('pointercancel', endDrag)
    }
  }, [gl, orbit])

  useFrame((state, delta) => {
    const g = ref.current
    if (!g) return
    const d = drag.current
    if (orbit && !d.active) {
      d.yaw = THREE.MathUtils.clamp(d.yaw + d.velYaw * delta, -YAW_LIMIT, YAW_LIMIT)
      d.pitch = THREE.MathUtils.clamp(d.pitch + d.velPitch * delta, PITCH_MIN, PITCH_MAX)
      const decay = Math.exp(-3.2 * delta)
      d.velYaw = Math.abs(d.yaw) >= YAW_LIMIT ? 0 : d.velYaw * decay
      d.velPitch = d.pitch <= PITCH_MIN || d.pitch >= PITCH_MAX ? 0 : d.velPitch * decay
    }
    const follow = orbit && (d.active || d.held) ? 0 : 1
    const idle = spin && follow && !reduceMotion ? Math.sin(state.clock.elapsedTime * spin) * 0.15 : 0
    const targetX = THREE.MathUtils.clamp(
      baseRotation[0] + (orbit ? d.pitch : 0) - state.pointer.y * strength * 0.5 * follow,
      -0.58,
      0.46,
    )
    const targetY = THREE.MathUtils.clamp(
      baseRotation[1] + (orbit ? d.yaw : 0) + state.pointer.x * strength * follow + idle,
      -1.2,
      1.2,
    )
    const lambda = orbit ? 8 : 3
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, lambda, delta)
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, lambda, delta)
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
    <mesh ref={ref} position={position} rotation={rotation} raycast={() => null}>
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
