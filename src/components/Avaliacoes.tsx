import { avaliacoes, linkGoogle } from '@/data/avaliacoes'
import { modoRevisao } from '@/lib/modo'
import { cn } from '@/lib/utils'
import { FitaCrepe } from './FitaCrepe'
import { FotoColada } from './FotoColada'
import { NotaGoogle } from './NotaGoogle'
import { Seta } from './Rabiscos'

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

function Bilhete({ texto, nome, i, total }: { texto: string | null; nome: string | null; i: number; total: number }) {
  // a largura acompanha quantos bilhetes existem: 2 bilhetes ocupam o espaço todo, sem buraco
  const largura = total >= 3 ? 'md:w-1/3' : total === 2 ? 'md:w-1/2' : 'md:w-2/3'
  return (
    <figure className={cn('relative w-full max-w-[21rem] md:max-w-none', largura, jeitosCelular[i % 3], jeitos[i % 3])} style={{ zIndex: i + 1 }}>
      <span className="absolute -top-3 left-1/2 z-10 h-6 w-20 -translate-x-1/2 rotate-3 bg-fita/90" style={{ clipPath: fitaPedaco }} aria-hidden="true" />
      <div className="border-2 border-cafe bg-[#fffdf8] px-5 pt-7 pb-5">
        <blockquote className="text-[1.02rem] leading-snug whitespace-pre-line">
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
  const temBilhete = bilhetes.length > 0

  return (
    <section className="relative px-4 pt-24 pb-20 md:px-[4vw] md:pt-[9vw] md:pb-[8vw]" aria-labelledby="titulo-avaliacoes">
      <div className="grid gap-12 md:grid-cols-[minmax(16rem,26vw)_1fr] md:gap-[4vw]">
        <div className="md:pt-6">
          <h2 id="titulo-avaliacoes" className="font-titulo text-[2.3rem] leading-[1.02] md:text-[3.2vw]">
            Quem senta na cadeira, volta.
          </h2>
          <FitaCrepe className="mt-2">texto</FitaCrepe>

          <NotaGoogle grande className="mt-8 -rotate-1" />
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

        <div>
          {temBilhete && (
            <div className="flex flex-col items-start md:flex-row md:items-start md:pt-10">
              {bilhetes.map((a, i) => (
                <Bilhete key={i} texto={a.texto} nome={a.nome} i={i} total={bilhetes.length} />
              ))}
            </div>
          )}

          {/* trabalhos de verdade, colados na parede ao lado dos recados */}
          <div className={cn('relative flex items-start justify-end', temBilhete ? (bilhetes.length >= 3 ? 'mt-6 md:mt-10 md:pr-[4vw]' : 'mt-6 md:-mt-[2vw] md:justify-center') : 'md:pr-[6vw]')}>
            <FotoColada
              foto="rosa"
              proporcao="1 / 1.05"
              foco="center 30%"
              className={cn('w-[52%] rotate-3', temBilhete ? 'md:w-[14vw]' : 'md:w-[19vw]')}
            />
            <FotoColada
              foto="azul"
              fita="cantos"
              proporcao="1 / 1"
              foco="center 22%"
              className={cn('mt-14 -ml-8 w-[42%] -rotate-[7deg] md:-ml-[2vw]', temBilhete ? 'md:mt-[6vw] md:w-[11vw]' : 'md:mt-[8vw] md:w-[15vw]')}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
