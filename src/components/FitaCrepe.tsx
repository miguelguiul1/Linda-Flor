import type { ReactNode } from 'react'
import { modoRevisao } from '@/lib/modo'
import { cn } from '@/lib/utils'

/*
  Etiqueta de fita crepe para pendências: [REVISAR], [DESCOBRIR], [CONFIRMAR], [FOTO].
  Só aparece no modo revisão. No modo apresentação some sem deixar buraco.
*/

const bordaRasgada =
  'polygon(0 12%, 3% 0, 97% 4%, 100% 0, 99% 50%, 100% 88%, 96% 100%, 4% 96%, 0 100%, 1% 55%)'

type Props = {
  tipo?: 'REVISAR' | 'DESCOBRIR' | 'CONFIRMAR' | 'FOTO'
  children?: ReactNode
  className?: string
}

export function FitaCrepe({ tipo = 'REVISAR', children, className }: Props) {
  if (!modoRevisao) return null
  return (
    <span
      className={cn(
        'inline-block -rotate-2 bg-fita/95 px-2 py-0.5 align-middle font-texto text-[0.72rem] leading-snug font-bold tracking-wide text-cafe normal-case',
        className,
      )}
      style={{ clipPath: bordaRasgada }}
    >
      [{tipo}]{children ? <span className="font-normal"> {children}</span> : null}
    </span>
  )
}
