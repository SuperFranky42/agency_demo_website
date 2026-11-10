import { useEffect, useId, useRef, useState } from 'react'

const listeners = new Set()

function pauseOthers(activeId) {
  listeners.forEach((pause) => pause(activeId))
}

export default function WorkVideo({ item }) {
  const videoRef = useRef(null)
  const primed = useRef(false)
  const keepPlaying = useRef(false)
  const pauseTimer = useRef(0)
  const id = useId()
  const [started, setStarted] = useState(false)

  useEffect(() => {
    function onOtherPlay(activeId) {
      if (activeId === id) return
      const video = videoRef.current
      if (video && !video.paused) video.pause()
    }
    listeners.add(onOtherPlay)
    return () => {
      listeners.delete(onOtherPlay)
      window.clearTimeout(pauseTimer.current)
    }
  }, [id])

  function showFirstFrame(event) {
    if (primed.current) return
    primed.current = true
    const video = event.currentTarget
    if (video.currentTime === 0) video.currentTime = 0.1
  }

  function play() {
    const video = videoRef.current
    if (!video) return
    pauseOthers(id)
    video.play()
  }

  function resumeAfterSeek(video) {
    window.clearTimeout(pauseTimer.current)
    if (keepPlaying.current && video.paused && !video.ended) video.play()
  }

  return (
    <div className="relative aspect-video overflow-hidden rounded-lg bg-ink">
        <video
          ref={videoRef}
          src={item.src}
          preload="metadata"
          playsInline
          controls={started}
          aria-label={item.title}
          className="h-full w-full object-cover"
          onLoadedMetadata={showFirstFrame}
          onPlay={() => {
            window.clearTimeout(pauseTimer.current)
            keepPlaying.current = true
            setStarted(true)
            pauseOthers(id)
          }}
          onPause={(event) => {
            const video = event.currentTarget
            if (video.seeking) return
            window.clearTimeout(pauseTimer.current)
            pauseTimer.current = window.setTimeout(() => {
              if (video.seeking || !video.paused || video.ended) return
              keepPlaying.current = false
            }, 400)
          }}
          onSeeking={() => window.clearTimeout(pauseTimer.current)}
          onSeeked={(event) => resumeAfterSeek(event.currentTarget)}
          onEnded={() => {
            window.clearTimeout(pauseTimer.current)
            keepPlaying.current = false
          }}
        />
        {!started && (
          <button
            type="button"
            onClick={play}
            aria-label={`Play ${item.title}`}
            className="absolute inset-0 flex cursor-pointer items-center justify-center bg-ink/25 transition hover:bg-ink/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-canvas text-ink" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-current">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
    </div>
  )
}
