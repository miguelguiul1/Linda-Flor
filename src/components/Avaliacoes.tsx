import { avaliacoes, linkGoogle } from '@/data/avaliacoes'
import { salao } from '@/data/salao'
import { modoRevisao } from '@/lib/modo'
import { cn } from '@/lib/utils'
import { FitaCrepe } from './FitaCrepe'
import { Circulo, Seta } from './Rabiscos'

/*
  Bilhetes presos no espelho, inclinados e um pouco por cima um do outro.
  Os textos vêm do Google, colados em src/data/avaliacoes.ts. Nada inventado.
*/

const jeitos = [
  'md:-rotate-3 md:translate-y-4',
  'md:rotate-2 md:-ml-6 md:-translate-y-6',
  'md:-rotate-1 md:-ml-6 md:translate-y-10',
]
const jeitosCelular = ['-rotate-2', 'rotate-2 -mt-3 ml-6', '-rotate-1 -mt-3']

const fitaPedaco = 'polygon(0 10%, 5% 0, 95% 6%, 100% 0, 98% 50%, 100% 92%, 94% 100%, 6% 94%, 0 100%, 2% 50%)'

function Bilhete({ texto, nome, i }: { texto: string | null; nome: string | null; i: number }) {
  return (
    <figure className={cn('relative w-full max-w-[21rem] md:w-1/3 md:max-w-none', jeitosCelular[i % 3], jeitos[i % 3])} style={{ zIndex: 3 - i }}>
      <span className="absolute -top-3 left-1/2 z-10 h-6 w-20 -translate-x-1/2 rotate-3 bg-fita/90" style={{ clipPath: fitaPedaco }} aria-hidden="true" />
      <div className="border-2 border-cafe bg-[#fffdf8] px-5 pt-7 pb-5">
        <blockquote className="text-[1.02rem] leading-snug">
          {texto ?? <FitaCrepe tipo="REVISAR" className="rotate-0">COLAR AVALIAÇÃO REAL do Google, sem mudar nada</FitaCrepe>}
        </blockquote>
        <figcaption className="mt-3 font-mao text-[1.7rem] leading-none text-rosa-tinta">
          — {nome ?? <span className="text-cafe-suave">primeiro nome</span>}
        </figcaption>
      </div>
    </figure>
  )
}

export function Avaliacoes() {
  // no modo apresentação só entram as avaliações já coladas
  const bilhetes = avaliacoes.filter((a) => modoRevisao || a.texto)

  return (
    <section className="relative px-4 pt-24 pb-20 md:px-[4vw] md:pt-[9vw] md:pb-[8vw]" aria-labelledby="titulo-avaliacoes">
      <div
        className={cn(
          'grid gap-12 md:gap-[4vw]',
          bilhetes.length > 0 ? 'md:grid-cols-[minmax(16rem,26vw)_1fr]' : 'md:mx-auto md:max-w-5xl',
        )}
      >
        <div className={cn('md:pt-6', bilhetes.length === 0 && 'md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-x-[6vw]')}>
          <h2 id="titulo-avaliacoes" className="font-titulo text-[2.3rem] leading-[1.02] md:text-[3.2vw]">
            Quem senta na cadeira, volta.
          </h2>
          <FitaCrepe className="mt-2">texto</FitaCrepe>

          <div>
          <a href={linkGoogle} target="_blank" rel="noopener" className="group/nota relative mt-8 inline-block px-12 py-8 text-cafe no-underline">
            <Circulo className="absolute inset-0 h-full w-full text-rosa-tinta" />
            <span className="block font-titulo text-[5.5rem] leading-[0.9]">{salao.google.nota}</span>
            <span className="mt-2 block font-mao text-[1.8rem] leading-none">{salao.google.avaliacoes} avaliações no Google</span>
          </a>
          <p className="mt-3">
            <a
              href={linkGoogle}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-11 items-center gap-1 font-bold text-rosa-tinta underline decoration-2 underline-offset-4"
            >
              Ler as avaliações no Google
              <Seta className="w-7 rotate-[35deg]" />
            </a>
          </p>
          </div>
        </div>

        {bilhetes.length > 0 && (
          <div className="flex flex-col items-start md:flex-row md:items-start md:pt-10">
            {bilhetes.map((a, i) => (
              <Bilhete key={i} texto={a.texto} nome={a.nome} i={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
