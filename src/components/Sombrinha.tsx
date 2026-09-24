import { useId, type CSSProperties } from 'react'

/*
  Sombrinha desenhada à mão (o "tremido" do traço vem do filtro #rabisco, definido uma vez em <FiltrosDesenho />).
  Três desenhos base, não um SVG repintado:
  - aberta: copa larga e baixa, 8 gomos
  - fechada: copa alta e estreita, 6 gomos, babado mais fundo
  - lado: copa vista um pouco de baixo, mostra o avesso do tecido
*/

export type Forma = 'aberta' | 'fechada' | 'lado'
export type Estampa = 'gomos' | 'lisa' | 'bolinha' | 'barrado'

const TRACO = 'var(--color-cafe)'

type Geo = {
  esq: number
  dir: number
  base: number
  topo: number
  copa: string
  gomos: number
  babado: number
}

const geometrias: Record<Forma, Geo> = {
  aberta: { esq: 4, dir: 196, base: 100, topo: 50, copa: 'M4,100 C22,34 178,34 196,100', gomos: 8, babado: 9 },
  fechada: { esq: 30, dir: 170, base: 104, topo: 43, copa: 'M30,104 C26,22 174,22 170,104', gomos: 6, babado: 13 },
  lado: { esq: 8, dir: 192, base: 96, topo: 44, copa: 'M8,96 C24,26 176,26 192,96', gomos: 8, babado: 8 },
}

/* Onde fica a ponteira, em fração da largura: o fio precisa encostar nela. */
export function alturaPonteira(forma: Forma) {
  return (geometrias[forma].topo - 8) / 200
}

function pontas(g: Geo) {
  const passo = (g.dir - g.esq) / g.gomos
  return Array.from({ length: g.gomos + 1 }, (_, i) => g.esq + i * passo)
}

function contorno(g: Geo) {
  const xs = pontas(g)
  let d = g.copa
  for (let i = xs.length - 1; i > 0; i--) {
    d += ` Q${(xs[i] + xs[i - 1]) / 2},${g.base - g.babado} ${xs[i - 1]},${g.base}`
  }
  return d + 'Z'
}

function babado(g: Geo) {
  const xs = pontas(g)
  let d = `M${xs[0]},${g.base}`
  for (let i = 1; i < xs.length; i++) {
    d += ` Q${(xs[i] + xs[i - 1]) / 2},${g.base - g.babado} ${xs[i]},${g.base}`
  }
  return d
}

type Props = {
  forma: Forma
  estampa: Estampa
  cor: string
  detalhe?: string
  className?: string
  style?: CSSProperties
}

export function Sombrinha({ forma, estampa, cor, detalhe = 'var(--color-papel)', className, style }: Props) {
  const id = useId().replace(/:/g, '')
  const g = geometrias[forma]
  const xs = pontas(g)
  const meio = (g.esq + g.dir) / 2
  const path = contorno(g)

  return (
    <svg viewBox="0 0 200 136" className={className} style={style} aria-hidden="true" overflow="visible">
      <defs>
        <clipPath id={`c${id}`}>
          <path d={path} />
        </clipPath>
        {estampa === 'bolinha' && (
          <pattern id={`p${id}`} width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
            <rect width="16" height="16" fill={cor} />
            <circle cx="4" cy="4" r="3" fill={detalhe} />
            <circle cx="12" cy="12" r="3" fill={detalhe} />
          </pattern>
        )}
      </defs>

      <g filter="url(#rabisco)">
        {/* ponteira em cima, onde o fio amarra */}
        <line x1={meio} y1={g.topo - 8} x2={meio} y2={g.topo + 2} stroke={TRACO} strokeWidth="3.2" strokeLinecap="round" />

        {forma === 'lado' && (
          <>
            {/* avesso do tecido, visto de baixo */}
            <ellipse cx={meio} cy={g.base} rx={(g.dir - g.esq) / 2} ry="17" fill={cor} />
            <ellipse cx={meio} cy={g.base} rx={(g.dir - g.esq) / 2} ry="17" fill={TRACO} opacity="0.28" />
            {xs.map((x) => (
              <line key={x} x1={meio} y1={g.base + 6} x2={x} y2={g.base + 2} stroke={TRACO} strokeWidth="1.2" opacity="0.7" />
            ))}
            <ellipse cx={meio} cy={g.base} rx={(g.dir - g.esq) / 2} ry="17" fill="none" stroke={TRACO} strokeWidth="2.2" />
          </>
        )}

        <path d={path} fill={estampa === 'bolinha' ? `url(#p${id})` : cor} />

        <g clipPath={`url(#c${id})`}>
          {estampa === 'gomos' &&
            xs.slice(0, -1).map((x, i) =>
              i % 2 === 0 ? (
                <polygon key={x} points={`${meio},${g.topo - 30} ${x},${g.base + 20} ${xs[i + 1]},${g.base + 20}`} fill={detalhe} />
              ) : null,
            )}
          {estampa === 'barrado' && <path d={babado(g)} fill="none" stroke={detalhe} strokeWidth="22" />}
          {/* sombra do lado direito, pra dar volume */}
          <path d={`M${meio + 30},${g.topo - 10} Q${g.dir - 8},${g.topo + 20} ${g.dir + 4},${g.base + 4} L${g.dir + 20},${g.base + 20} L${g.dir + 20},${g.topo - 20}Z`} fill={TRACO} opacity="0.12" />
        </g>

        {/* varetas */}
        {xs.slice(1, -1).map((x) => (
          <path
            key={x}
            d={`M${meio},${g.topo} Q${meio + (x - meio) * 0.82},${g.topo + (g.base - g.topo) * 0.3} ${x},${g.base}`}
            fill="none"
            stroke={TRACO}
            strokeWidth="1.5"
          />
        ))}

        <path d={path} fill="none" stroke={TRACO} strokeWidth="2.4" strokeLinejoin="round" />

        {/* cabo com a curvinha */}
        <path
          d={`M${meio},${g.base - 4} L${meio},${g.base + (forma === 'lado' ? 26 : 16)} q0,9 -8,9 q-6,0 -6,-6`}
          fill="none"
          stroke={TRACO}
          strokeWidth="2.8"
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}

/* Filtro do traço tremido, compartilhado por todas as ilustrações. */
export function FiltrosDesenho() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <filter id="rabisco" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" result="ruido" />
        <feDisplacementMap in="SourceGraphic" in2="ruido" scale="3.2" />
      </filter>
      <filter id="rabisco-papel" x="-5%" y="-20%" width="110%" height="140%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="11" result="ruido" />
        <feDisplacementMap in="SourceGraphic" in2="ruido" scale="4" />
      </filter>
    </svg>
  )
}
