import { useState } from 'react'
import { salao } from '@/data/salao'
import { modoRevisao } from '@/lib/modo'
import { FitaCrepe } from './FitaCrepe'
import { Sombrinha } from './Sombrinha'

/*
  Mapinha desenhado: só a avenida e o 191. Nenhum ponto de referência ou rua vizinha
  entra no desenho até a dona confirmar. O desenho é decorativo (aria-hidden);
  o endereço de verdade está em texto ao lado, para leitor de tela e para copiar.
*/

const { endereco } = salao
const enderecoCompleto = `${endereco.rua} - ${endereco.bairro}, ${endereco.cidade} - ${endereco.uf}, ${endereco.cep}`
const linkMaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(enderecoCompleto)}`

function Mapinha() {
  return (
    <svg viewBox="0 0 560 380" className="h-auto w-full" aria-hidden="true" overflow="visible">
      <defs>
        <path id="eixo-avenida" d="M-20,262 C120,232 250,214 360,180 C440,156 510,130 590,96" />
      </defs>
      <g filter="url(#rabisco)" fill="none" stroke="var(--color-cafe)" strokeLinecap="round">
        {/* quarteirões sem nome, só pra dar chão ao desenho */}
        <path d="M-20,212 C110,184 240,164 350,132 C420,112 490,86 590,48" strokeWidth="2.4" />
        <path d="M-20,312 C130,282 262,266 372,230 C452,204 520,178 590,146" strokeWidth="2.4" />
        <path d="M-20,262 C120,232 250,214 360,180 C440,156 510,130 590,96" strokeWidth="1.6" strokeDasharray="14 12" opacity="0.55" />
      </g>

      <text className="fill-cafe font-titulo" fontSize="26" letterSpacing="1">
        <textPath href="#eixo-avenida" startOffset="6%" dy="-10">
          Av. Juan Esper
        </textPath>
      </text>

      {/* o 191: uma sombrinha espetada como alfinete */}
      <g transform="translate(300 20)">
        <line x1="60" y1="120" x2="60" y2="168" stroke="var(--color-cafe)" strokeWidth="2.6" />
        <circle cx="60" cy="170" r="6" fill="var(--color-rosa)" stroke="var(--color-cafe)" strokeWidth="2" />
        <foreignObject x="0" y="36" width="120" height="100">
          <Sombrinha forma="aberta" estampa="gomos" cor="var(--color-rosa)" className="block w-full" />
        </foreignObject>
      </g>
      <text x="236" y="40" className="fill-rosa-tinta font-mao" fontSize="42" transform="rotate(-4 236 40)">
        é aqui, no 191
      </text>
    </svg>
  )
}

export function ComoChegar() {
  const [copiado, setCopiado] = useState(false)

  async function copiar() {
    try {
      await navigator.clipboard.writeText(enderecoCompleto)
      setCopiado(true)
      window.setTimeout(() => setCopiado(false), 2500)
    } catch {
      // sem permissão de área de transferência: o texto continua selecionável na tela
    }
  }

  return (
    <section id="como-chegar" className="relative scroll-mt-4 border-t-2 border-cafe px-4 pt-16 pb-20 md:px-[4vw] md:pt-[6vw] md:pb-[7vw]" aria-labelledby="titulo-chegar">
      <div className="grid items-center gap-10 md:grid-cols-[1.35fr_1fr] md:gap-[5vw]">
        <div className="order-2 md:order-1 md:-ml-[2vw]">
          <Mapinha />
        </div>

        <div className="order-1 md:order-2">
          <h2 id="titulo-chegar" className="font-titulo text-[2.3rem] leading-[1.02] md:text-[3.2vw]">
            Como chegar
          </h2>

          <address className="mt-5 text-[1.2rem] leading-snug not-italic">
            <span className="block font-bold">{endereco.rua}</span>
            <span className="block">{endereco.bairro}, zona sul</span>
            <span className="block">
              {endereco.cidade} - {endereco.uf}, CEP {endereco.cep}
            </span>
          </address>

          {modoRevisao && (
            <p className="mt-3">
              <FitaCrepe tipo="DESCOBRIR">ponto de referência pra chegar (ex.: perto de quê?)</FitaCrepe>
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={linkMaps}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-11 items-center font-bold text-rosa-tinta underline decoration-2 underline-offset-4"
            >
              Abrir no Google Maps
            </a>
            <button
              type="button"
              onClick={copiar}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 border-b-2 border-dashed border-cafe/60 font-bold text-cafe hover:border-cafe"
            >
              Copiar endereço
            </button>
            <span className="font-mao text-[1.6rem] leading-none text-rosa-tinta" role="status">
              {copiado ? 'copiado!' : ''}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
