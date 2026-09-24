import { salao, linkWhatsApp } from '@/data/salao'
import { modoRevisao } from '@/lib/modo'
import type { ReactNode } from 'react'
import { FitaCrepe } from './FitaCrepe'

/*
  Rodapé como a primeira página da agenda do salão: espiral em cima, margem rosa,
  pauta. Rótulos escritos à mão, dados em letra de forma (legível e copiável).
*/

const coresDoSite = [
  ['Papel de Comanda', 'var(--color-papel)'],
  ['Café Coado', 'var(--color-cafe)'],
  ['Rosa Linda Flor', 'var(--color-rosa)'],
  ['Mostarda de Feira', 'var(--color-mostarda)'],
  ['Verde Garrafa', 'var(--color-verde)'],
] as const

function Linha({ rotulo, children }: { rotulo: string; children: ReactNode }) {
  return (
    <div className="grid min-h-12 items-end gap-x-3 gap-y-0.5 border-b border-[#c9d6e6] pt-2 pb-1.5 md:grid-cols-[9rem_1fr]">
      <dt className="font-mao text-[1.5rem] leading-none text-cafe-suave md:text-[1.6rem]">{rotulo}</dt>
      <dd className="text-[1.05rem] leading-snug">{children}</dd>
    </div>
  )
}

export function Rodape() {
  const { endereco } = salao
  return (
    <footer className="px-4 pt-6 pb-24 md:px-[4vw] md:pb-16">
      <div className="relative mx-auto max-w-4xl border-2 border-cafe bg-[#fffdf8] md:rotate-[-0.4deg]">
        {/* espiral da agenda */}
        <div className="absolute inset-x-6 -top-3 flex justify-between" aria-hidden="true">
          {Array.from({ length: 16 }, (_, i) => (
            <span key={i} className="block h-6 w-2.5 rounded-full border-2 border-cafe bg-papel" />
          ))}
        </div>

        <div className="relative py-10 pr-5 pl-12 md:pr-12 md:pl-24">
          {/* margem rosa */}
          <span className="absolute inset-y-0 left-8 w-0.5 bg-rosa md:left-16" aria-hidden="true" />

          <p className="font-titulo text-[2rem] leading-none">
            Linda Flor <span className="font-mao text-[1.7rem] text-rosa-tinta">espaço beleza</span>
          </p>

          <dl className="mt-6">
            <Linha rotulo="endereço">
              {endereco.rua}, {endereco.bairro} · {endereco.cidade}/{endereco.uf}
            </Linha>
            <Linha rotulo="horário">
              {salao.dias},{' '}
              {modoRevisao ? (
                <>
                  das {salao.abre} às 18h ou 19h <FitaCrepe tipo="CONFIRMAR" />
                </>
              ) : (
                <>a partir das {salao.abre}</>
              )}
            </Linha>
            <Linha rotulo="marcar">
              <a
                href={linkWhatsApp('Oi! Vim pelo site da Linda Flor e queria marcar um horário.')}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-11 items-center font-bold text-rosa-tinta underline decoration-2 underline-offset-4"
              >
                WhatsApp {salao.telefone}
              </a>
              <span className="text-cafe-suave"> · ou liga no mesmo número</span>
            </Linha>
            <Linha rotulo="instagram">
              <a
                href={`https://www.instagram.com/${salao.instagram}/`}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-11 items-center underline decoration-cafe/40 decoration-2 underline-offset-4 hover:decoration-cafe"
              >
                @{salao.instagram}
              </a>
            </Linha>
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.85rem] text-cafe-suave">
            <span className="font-mao text-[1.4rem] leading-none">as cores deste site têm nome de esmalte:</span>
            {coresDoSite.map(([nome, cor]) => (
              <span key={nome} className="inline-flex items-center gap-1.5">
                <span className="size-3 rounded-full border border-cafe" style={{ background: cor }} aria-hidden="true" />
                {nome}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
