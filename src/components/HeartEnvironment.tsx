import { useEffect, useState } from 'react'

export function HeartEnvironment() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      setTilt({
        x: (event.clientX / window.innerWidth - 0.5) * 12,
        y: (event.clientY / window.innerHeight - 0.5) * -10,
      })
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [])

  return (
    <div className="heart-environment" aria-hidden="true">
      <img
        className="heart-reference-image"
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-11-03%20111112-ChjDLVcpHekLc1bhcZHSlhhIonme7G.png"
        alt=""
      />
      <div className="heart-scene" style={{ transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }}>
        <div className="heart-core" />
        <div className="heart-vessel heart-vessel-one" />
        <div className="heart-vessel heart-vessel-two" />
        <div className="heart-glow" />
      </div>
      <div className="heart-particles" />
    </div>
  )
}
