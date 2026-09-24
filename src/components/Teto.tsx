import { useEffect, useRef, type CSSProperties, type PointerEvent } from 'react'
import { alturaPonteira, Sombrinha, type Estampa, type Forma } from './Sombrinha'

/*
  O teto do salão. Cada sombrinha foi posicionada à mão (nada de grade):
  x = centro em % da largura, fio e largura em vw (o desenho escala junto com a tela),
  inclinação entre -12° e +12°. Algumas saem pela borda de propósito.
*/

type Pendurada = {
  x: number
  fio: number
  w: number
  giro: number
  forma: Forma
  estampa: Estampa
  cor: string
  detalhe?: string
  z?: number
}

const c = (nome: string) => `var(--color-${nome})`

// Desktop (≥ 768px). Título ocupa a faixa de ~27vw pra baixo, à esquerda de ~62vw.
const tetoLargo: Pendurada[] = [
  { x: -1, fio: 1, w: 16, giro: 9, forma: 'aberta', estampa: 'gomos', cor: c('rosa'), detalhe: c('papel') },
  { x: 7, fio: 13, w: 7, giro: -5, z: 0, forma: 'fechada', estampa: 'lisa', cor: c('rosa-escuro') },
  { x: 15, fio: 5, w: 9.5, giro: -11, forma: 'fechada', estampa: 'lisa', cor: c('mostarda-claro') },
  { x: 26, fio: 0.5, w: 20, giro: 4, forma: 'lado', estampa: 'bolinha', cor: c('verde'), detalhe: c('papel'), z: 2 },
  { x: 47, fio: 11, w: 7.5, giro: -9, forma: 'fechada', estampa: 'gomos', cor: c('rosa-escuro'), detalhe: c('rosa-claro'), z: 4 },
  { x: 40.5, fio: 6.5, w: 13, giro: 11, z: 3, forma: 'aberta', estampa: 'barrado', cor: c('rosa'), detalhe: c('mostarda') },
  { x: 53.5, fio: 14, w: 10, giro: -4, forma: 'aberta', estampa: 'gomos', cor: c('verde-claro'), detalhe: c('mostarda-claro'), z: 3 },
  { x: 61, fio: 0, w: 17, giro: -8, forma: 'fechada', estampa: 'bolinha', cor: c('rosa'), detalhe: c('papel'), z: 1 },
  { x: 73, fio: 11, w: 23, giro: 5, forma: 'lado', estampa: 'gomos', cor: c('mostarda'), detalhe: c('papel'), z: 4 },
  { x: 84, fio: 2, w: 10, giro: 12, forma: 'aberta', estampa: 'lisa', cor: c('verde-escuro') },
  { x: 92, fio: 19, w: 13, giro: -7, forma: 'fechada', estampa: 'gomos', cor: c('rosa'), detalhe: c('mostarda-claro'), z: 1 },
  { x: 101, fio: 5, w: 18, giro: -11, forma: 'aberta', estampa: 'gomos', cor: c('verde-claro'), detalhe: c('papel') },
  { x: 81, fio: 30, w: 8.5, giro: 7, forma: 'lado', estampa: 'lisa', cor: c('rosa-claro'), z: 0 },
  { x: 95.5, fio: 36, w: 6.5, giro: -3, forma: 'aberta', estampa: 'bolinha', cor: c('mostarda'), detalhe: c('cafe'), z: 0 },
]

// Celular. Tudo termina antes de ~76vw, onde começa o título: nada passa por cima do texto.
const tetoEstreito: Pendurada[] = [
  { x: 2, fio: 1, w: 39.1, giro: 8, forma: 'aberta', estampa: 'gomos', cor: c('rosa'), detalhe: c('papel') },
  { x: 39, fio: 12, w: 21.8, giro: -9, z: 3, forma: 'fechada', estampa: 'lisa', cor: c('mostarda-claro') },
  { x: 58, fio: 0, w: 35.6, giro: 4, forma: 'lado', estampa: 'bolinha', cor: c('verde'), detalhe: c('papel'), z: 2 },
  { x: 86, fio: 20, w: 27.6, giro: -11, forma: 'fechada', estampa: 'gomos', cor: c('rosa-escuro'), detalhe: c('rosa-claro'), z: 3 },
  { x: 101, fio: 2, w: 25.3, giro: -6, forma: 'aberta', estampa: 'lisa', cor: c('verde-escuro') },
  { x: 16, fio: 41, w: 19.5, z: 0, giro: 11, forma: 'aberta', estampa: 'barrado', cor: c('verde-claro'), detalhe: c('mostarda') },
  { x: 47, fio: 37, w: 27.6, giro: -3, forma: 'aberta', estampa: 'gomos', cor: c('mostarda'), detalhe: c('papel'), z: 3 },
  { x: 77, fio: 50, w: 16.1, giro: 9, forma: 'lado', estampa: 'lisa', cor: c('rosa-claro'), z: 0 },
]

const reduzMovimento = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function balancar(el: HTMLElement, graus: number, atraso = 0) {
  if (el.getAnimations().length) return
  const a = graus
  el.animate(
    [0, a, -0.62 * a, 0.36 * a, -0.18 * a, 0.07 * a, 0].map((g) => ({ transform: `rotate(${g}deg)` })),
    { duration: 2200, delay: atraso, easing: 'ease-in-out' },
  )
}

function Fileira({ itens, className }: { itens: Pendurada[]; className: string }) {
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (reduzMovimento()) return
    let ultimoY = window.scrollY
    let ultimoT = performance.now()
    let pausa = 0
    const aoRolar = () => {
      const agora = performance.now()
      const v = (window.scrollY - ultimoY) / Math.max(agora - ultimoT, 16)
      ultimoY = window.scrollY
      ultimoT = agora
      if (agora < pausa || Math.abs(v) < 0.4 || window.scrollY > window.innerHeight) return
      pausa = agora + 900
      refs.current.forEach((el, i) => {
        if (!el) return
        const leveza = 12 / itens[i].w // as pequenas balançam mais
        balancar(el, Math.max(-9, Math.min(9, -v * 3.5 * leveza)), i * 35)
      })
    }
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [itens])

  const aoPassar = (i: number) => (e: PointerEvent) => {
    const el = refs.current[i]
    if (!el || reduzMovimento() || e.pointerType !== 'mouse') return
    balancar(el, (e.movementX >= 0 ? 1 : -1) * Math.min(8, 60 / itens[i].w))
  }

  return (
    <div className={className} aria-hidden="true">
      {itens.map((s, i) => (
        <div
          key={i}
          className="absolute top-0"
          style={{
            left: `calc(${s.x}% - ${s.w / 2}vw)`,
            width: `${s.w}vw`,
            zIndex: s.z ?? 1,
            transform: `rotate(${s.giro}deg)`,
            transformOrigin: '50% 0',
          }}
        >
          <div
            className="balanco"
            style={
              {
                '--amp': `${(0.6 + ((i * 7) % 5) * 0.25).toFixed(2)}deg`,
                '--dur': `${5 + ((i * 3) % 4)}s`,
                '--atraso': `-${(i * 1.7) % 5}s`,
              } as CSSProperties
            }
          >
            <div ref={(el) => void (refs.current[i] = el)} style={{ transformOrigin: '50% 0' }} onPointerEnter={aoPassar(i)}>
              <div className="mx-auto w-[1.5px] bg-cafe/80" style={{ height: `calc(${s.fio}vw + 6px)` }} />
              <Sombrinha
                forma={s.forma}
                estampa={s.estampa}
                cor={s.cor}
                detalhe={s.detalhe}
                className="block w-full"
                style={{ marginTop: `-${alturaPonteira(s.forma) * s.w}vw` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function Teto() {
  return (
    <>
      <Fileira itens={tetoEstreito} className="pointer-events-none absolute inset-x-0 top-0 md:hidden" />
      <Fileira itens={tetoLargo} className="pointer-events-none absolute inset-x-0 top-0 hidden md:block [&_svg]:pointer-events-auto" />
    </>
  )
}
