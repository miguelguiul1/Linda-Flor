import { salao, linkWhatsApp } from '@/data/salao'
import { modoRevisao } from '@/lib/modo'
import { FitaCrepe } from './FitaCrepe'
import { Circulo, Seta } from './Rabiscos'
import { Teto } from './Teto'
import { Botao } from './ui/button'

export function Forro() {
  return (
    <header className="relative z-20 border-b-2 border-cafe bg-papel">
      <div className="flex items-center justify-between gap-4 px-4 py-2.5 md:px-[4vw]">
        <a href="#topo" className="flex items-center gap-3 no-underline">
          {/* logo original, branco sobre rosa, sem mexer */}
          <img src="/logo-linda-flor.jpg" alt="" width="44" height="44" className="size-11 border-[1.5px] border-cafe" />
          <span className="font-titulo text-[1.35rem] leading-none text-cafe">
            Linda Flor
            <span className="mt-0.5 block font-texto text-[0.78rem] tracking-[0.06em] text-cafe-suave">espaço beleza · Veleiros</span>
          </span>
        </a>
        <nav className="flex items-center gap-6 text-[0.95rem]">
          <a href="#cardapio" className="hidden min-h-11 items-center text-cafe underline-offset-4 hover:underline md:inline-flex">Serviços</a>
          <a href="#como-chegar" className="hidden min-h-11 items-center text-cafe underline-offset-4 hover:underline md:inline-flex">Como chegar</a>
          <a
            href={linkWhatsApp()}
            className="inline-flex min-h-11 items-center font-bold text-rosa-tinta underline decoration-2 underline-offset-4"
            target="_blank"
            rel="noopener"
          >
            <span className="md:hidden">WhatsApp</span>
            <span className="hidden md:inline">WhatsApp {salao.telefone}</span>
          </a>
        </nav>
      </div>
    </header>
  )
}

export function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden pb-16 md:pb-[6vw]" aria-labelledby="titulo-hero">
      <Teto />

      {/* anotação de caneta apontando pro teto */}
      <p className="pointer-events-none absolute top-[61vw] left-[4vw] z-10 flex items-end gap-1 font-mao text-[1.6rem] leading-none whitespace-nowrap text-rosa-tinta md:top-[33.5vw] md:left-[45vw] md:text-[2vw]">
        <span className="-rotate-3">o teto de lá é assim mesmo</span>
        <Seta className="mb-3 w-10 md:w-[3.4vw]" />
      </p>

      <div className="relative z-10 px-4 pt-[76vw] md:px-[4vw] md:pt-[22.5vw]">
        <h1 id="titulo-hero" className="max-w-[16ch] font-titulo text-[12.2vw] leading-[0.98] tracking-[-0.01em] md:max-w-[60vw] md:text-[6.5vw]">
          Senta, que o café já tá passando.
        </h1>
        <FitaCrepe className="mt-2">texto do título e do parágrafo</FitaCrepe>

        <div className="mt-6 grid gap-8 md:mt-[2.4vw] md:grid-cols-[minmax(0,34rem)_1fr] md:items-end">
          <div>
            <p className="max-w-[34rem] text-[1.12rem] md:text-[1.2rem]">
              Manicure e pedicure com cafezinho e conversa boa, debaixo de um teto de guarda-chuvas.
            </p>
            <p className="mt-3 text-[0.98rem] text-cafe-suave">
              {salao.endereco.rua} · {salao.endereco.bairro}
              <br />
              {salao.dias}, {modoRevisao ? (
                <>
                  das {salao.abre} às 18h ou 19h <FitaCrepe tipo="CONFIRMAR">horário de fechar</FitaCrepe>
                </>
              ) : (
                <>a partir das {salao.abre}</>
              )}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5 pl-7">
              <Botao href="#cardapio" tamanho="grande">
                Marcar meu horário
              </Botao>
              <a
                href={linkWhatsApp('Oi! Vim pelo site e queria marcar um horário.')}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-11 items-center font-bold text-rosa-tinta underline decoration-2 underline-offset-4"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>

          {/* nota do Google, circulada à caneta */}
          <a
            href="https://www.google.com/maps/search/?api=1&query=Linda+Flor+Espa%C3%A7o+Beleza+Av.+Juan+Esper+191"
            target="_blank"
            rel="noopener"
            className="relative w-fit rotate-2 justify-self-start px-10 py-6 text-cafe no-underline md:mr-[6vw] md:justify-self-end"
          >
            <Circulo className="absolute inset-0 h-full w-full text-rosa-tinta" />
            <span className="block font-titulo text-5xl leading-none">
              {salao.google.nota}
            </span>
            <span className="mt-1 block font-mao text-[1.5rem] leading-none">
              {salao.google.avaliacoes} avaliações no Google
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
