import { cn } from '@/lib/utils'

/*
  Foto de trabalho real, colada na parede do salão com fita crepe.
  Cada uma tem tamanho, inclinação e fita diferentes (passados por className/props),
  para não virar uma galeria em grade.
  Fotos do Instagram do salão. [CONFIRMAR] autorização da Márcia (ver PLACEHOLDERS.md).
*/

export const fotos = {
  verde: { src: '/fotos/unhas-verde.webp', alt: 'Unhas em verde-oliva, com uma unha branca e uma com glitter', w: 760, h: 760 },
  branco: { src: '/fotos/unhas-branco.webp', alt: 'Unhas quadradas curtas em branco leitoso', w: 760, h: 760 },
  vinho: { src: '/fotos/unhas-vinho.webp', alt: 'Unhas curtas arredondadas em vinho', w: 760, h: 760 },
  rosa: { src: '/fotos/unhas-rosa.webp', alt: 'Unhas quadradas em rosa escuro, com plantas ao fundo', w: 760, h: 1011 },
  azul: { src: '/fotos/unhas-azul.webp', alt: 'Unhas em azul acinzentado, uma delas com brilho', w: 760, h: 1011 },
} as const

export type FotoId = keyof typeof fotos

const fitaPedaco = 'polygon(0 10%, 5% 0, 95% 6%, 100% 0, 98% 50%, 100% 92%, 94% 100%, 6% 94%, 0 100%, 2% 50%)'

type Props = {
  foto: FotoId
  className?: string
  /* onde vai a fita: em cima no meio, ou atravessando dois cantos */
  fita?: 'topo' | 'cantos'
  /* recorte da foto (proporção) */
  proporcao?: string
  foco?: string
}

export function FotoColada({ foto, className, fita = 'topo', proporcao, foco = 'center' }: Props) {
  const f = fotos[foto]
  return (
    <figure className={cn('relative', className)}>
      <div className="border-2 border-cafe bg-[#fffdf8] p-1.5 pb-2 md:p-2 md:pb-3">
        <img
          src={f.src}
          alt={f.alt}
          width={f.w}
          height={f.h}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full object-cover"
          style={{ aspectRatio: proporcao ?? `${f.w} / ${f.h}`, objectPosition: foco }}
        />
      </div>
      {fita === 'topo' ? (
        <span
          className="absolute -top-3 left-1/2 h-6 w-[42%] -translate-x-1/2 -rotate-3 bg-fita/85"
          style={{ clipPath: fitaPedaco }}
          aria-hidden="true"
        />
      ) : (
        <>
          <span className="absolute -top-2 -left-4 h-6 w-[34%] -rotate-[38deg] bg-fita/85" style={{ clipPath: fitaPedaco }} aria-hidden="true" />
          <span className="absolute -right-4 -bottom-1 h-6 w-[34%] -rotate-[38deg] bg-fita/85" style={{ clipPath: fitaPedaco }} aria-hidden="true" />
        </>
      )}
    </figure>
  )
}
