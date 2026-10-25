import { lazy, Suspense } from 'react'

const Platforms3D = lazy(() => import('./hero-3d/Platforms3D.jsx'))

export default function HeroArt() {
  return (
    <div className="relative h-[420px] w-full overflow-hidden sm:h-[520px] md:h-[560px]">
      <Suspense fallback={null}>
        <Platforms3D />
      </Suspense>
    </div>
  )
}
