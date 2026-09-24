import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'

/*
  Base do shadcn (cva + cn), mas sem nada do visual padrão:
  o botão é um pedaço de papel do salão. Três formas em prova:
  - etiqueta: etiqueta de preço com furo e barbante
  - fita: papel rosa preso por um pedaço de fita crepe
  - canhoto: canhoto de comanda com picote e número
*/

const botaoVariants = cva(
  'group/botao relative isolate inline-flex cursor-pointer items-center justify-center gap-2 font-texto font-bold text-cafe no-underline transition-transform duration-300 ease-out select-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      forma: {
        etiqueta: 'pl-10 pr-7 origin-[18px_50%] hover:-rotate-3 active:rotate-0',
        fita: 'px-7 hover:-translate-y-0.5 active:translate-y-0',
        canhoto: 'pl-6 pr-[5.4rem] hover:-translate-y-0.5 active:translate-y-0',
      },
      tamanho: {
        normal: 'min-h-12 py-3 text-[1.05rem]',
        grande: 'min-h-14 py-3.5 text-lg',
      },
    },
    defaultVariants: { forma: 'etiqueta', tamanho: 'normal' },
  },
)

type Forma = NonNullable<VariantProps<typeof botaoVariants>['forma']>

function Papel({ forma }: { forma: Forma }) {
  const d =
    forma === 'etiqueta'
      ? 'M24,2 L237,4 L238,61 L24,62 L3,33 Z'
      : forma === 'fita'
        ? 'M3,4 L237,2 L238,61 L2,62 Z'
        : 'M2,3 L238,2 L237,62 L3,61 Z'
  return (
    <svg
      viewBox="0 0 240 64"
      preserveAspectRatio="none"
      className="absolute inset-0 -z-10 h-full w-full overflow-visible"
      aria-hidden="true"
    >
      <path
        d={d}
        fill="var(--color-rosa)"
        stroke="var(--color-cafe)"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        strokeLinejoin="round"
        filter="url(#rabisco-papel)"
      />
      {forma === 'canhoto' && (
        <line
          x1="176"
          y1="6"
          x2="176"
          y2="58"
          stroke="var(--color-cafe)"
          strokeWidth="1.6"
          strokeDasharray="3 4"
          vectorEffect="non-scaling-stroke"
        />
      )}
    </svg>
  )
}

function Enfeite({ forma }: { forma: Forma }) {
  if (forma === 'etiqueta')
    return (
      <>
        {/* furo */}
        <span className="absolute top-1/2 left-[13px] size-[11px] -translate-y-1/2 rounded-full border-2 border-cafe bg-papel" />
        {/* barbante */}
        <svg viewBox="0 0 60 40" className="absolute top-1/2 -left-[34px] w-[52px] -translate-y-[62%] overflow-visible" aria-hidden="true">
          <path d="M52,21 C40,4 18,2 10,12 C2,22 14,34 26,26" fill="none" stroke="var(--color-cafe)" strokeWidth="1.6" strokeLinecap="round" filter="url(#rabisco)" />
        </svg>
      </>
    )
  if (forma === 'fita')
    return (
      <span
        className="absolute -top-2.5 -left-4 h-6 w-16 -rotate-[32deg] bg-fita/90 shadow-[0_1px_0_rgb(43_31_26/0.15)] transition-transform duration-300 group-hover/botao:-rotate-[28deg]"
        style={{
          clipPath:
            'polygon(0 8%, 6% 0, 12% 10%, 18% 2%, 82% 0, 88% 9%, 94% 1%, 100% 10%, 100% 92%, 94% 100%, 88% 90%, 82% 99%, 18% 100%, 12% 91%, 6% 100%, 0 90%)',
        }}
      />
    )
  return (
    <>
      <span className="absolute -top-[7px] right-[26.7%] size-3.5 translate-x-1/2 rounded-full border-2 border-cafe bg-papel [clip-path:inset(50%_0_0_0)]" />
      <span className="absolute -bottom-[7px] right-[26.7%] size-3.5 translate-x-1/2 rounded-full border-2 border-cafe bg-papel [clip-path:inset(0_0_50%_0)]" />
      <span className="absolute top-1/2 right-2.5 -translate-y-1/2 -rotate-6 font-mao text-[1.75rem] leading-none font-normal">nº 191</span>
    </>
  )
}

type BotaoProps = VariantProps<typeof botaoVariants> & {
  className?: string
  children: ReactNode
} & (({ href: string } & ComponentProps<'a'>) | ({ href?: undefined } & ComponentProps<'button'>))

/* Com href vira link (<a>), sem href é <button>. A decoração de papel vem junto nos dois casos. */
export function Botao({ className, forma, tamanho, children, ...props }: BotaoProps) {
  const f: Forma = forma ?? 'etiqueta'
  const classes = cn(botaoVariants({ forma: f, tamanho }), className)
  const miolo = (
    <>
      <Papel forma={f} />
      <Enfeite forma={f} />
      {children}
    </>
  )
  if (props.href !== undefined) {
    return (
      <a className={classes} {...(props as ComponentProps<'a'>)}>
        {miolo}
      </a>
    )
  }
  return (
    <button className={classes} {...(props as ComponentProps<'button'>)}>
      {miolo}
    </button>
  )
}

export { botaoVariants }
