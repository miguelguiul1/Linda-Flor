import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'

/*
  Base do shadcn (cva + cn), mas sem nada do visual padrão:
  o botão é uma etiqueta de preço de papel rosa, com furo e barbante.

  - Área de toque: o elemento inteiro (papel + furo) é clicável e tem no mínimo 48px de altura.
    O barbante fica fora, é só enfeite e não recebe clique.
  - O giro pelo furo só acontece com mouse (Tailwind v4: hover = @media (hover: hover))
    e só se a pessoa não pediu "reduzir movimento" (motion-safe).
  - Parado (celular), já é botão: papel rosa chapado, contorno escuro, texto em negrito.
*/

const botaoVariants = cva(
  [
    'group/botao relative isolate inline-flex cursor-pointer items-center justify-center gap-2',
    'min-w-11 pr-7 pl-10 font-texto font-bold text-cafe no-underline select-none',
    'origin-[18px_50%] motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out',
    'motion-safe:hover:-rotate-3 motion-safe:active:rotate-0',
    'active:translate-y-px disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      tamanho: {
        normal: 'min-h-12 py-3 text-[1.05rem]',
        grande: 'min-h-14 py-3.5 text-lg',
      },
    },
    defaultVariants: { tamanho: 'normal' },
  },
)

function Etiqueta() {
  return (
    <>
      <svg
        viewBox="0 0 240 64"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-visible"
        aria-hidden="true"
      >
        <path
          d="M24,2 L237,4 L238,61 L24,62 L3,33 Z"
          fill="var(--color-rosa)"
          stroke="var(--color-cafe)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          strokeLinejoin="round"
          filter="url(#rabisco-papel)"
        />
      </svg>
      {/* furo */}
      <span className="pointer-events-none absolute top-1/2 left-[13px] size-[11px] -translate-y-1/2 rounded-full border-2 border-cafe bg-papel" />
      {/* barbante: fora da etiqueta, não conta como área de toque */}
      <svg
        viewBox="0 0 60 40"
        className="pointer-events-none absolute top-1/2 -left-[34px] w-[52px] -translate-y-[62%] overflow-visible"
        aria-hidden="true"
      >
        <path
          d="M52,21 C40,4 18,2 10,12 C2,22 14,34 26,26"
          fill="none"
          stroke="var(--color-cafe)"
          strokeWidth="1.6"
          strokeLinecap="round"
          filter="url(#rabisco)"
        />
      </svg>
    </>
  )
}

type BotaoProps = VariantProps<typeof botaoVariants> & {
  className?: string
  children: ReactNode
} & (({ href: string } & ComponentProps<'a'>) | ({ href?: undefined } & ComponentProps<'button'>))

/* Com href vira link (<a>), sem href é <button>. */
export function Botao({ className, tamanho, children, ...props }: BotaoProps) {
  const classes = cn(botaoVariants({ tamanho }), className)
  const miolo = (
    <>
      <Etiqueta />
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
    <button type="button" className={classes} {...(props as ComponentProps<'button'>)}>
      {miolo}
    </button>
  )
}

export { botaoVariants }
