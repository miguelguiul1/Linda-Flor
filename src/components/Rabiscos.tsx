import type { CSSProperties } from 'react'

/* Rabiscos de caneta: seta e círculo feitos "à mão" para as anotações. */

export function Seta({ className, style, d = 'M4,58 C30,60 60,44 70,10' }: { className?: string; style?: CSSProperties; d?: string }) {
  return (
    <svg viewBox="0 0 80 64" className={className} style={style} fill="none" aria-hidden="true" overflow="visible">
      <g filter="url(#rabisco)" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
        <path d="M58,16 L70,9 L73,23" />
      </g>
    </svg>
  )
}

export function Circulo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 110" preserveAspectRatio="none" className={className} fill="none" aria-hidden="true">
      <path
        d="M112,8 C58,2 10,22 8,54 C6,88 60,104 112,102 C164,100 194,80 192,52 C190,22 150,6 96,10 C80,11 66,14 56,18"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        filter="url(#rabisco)"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
