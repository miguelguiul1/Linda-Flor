import { cardapio, type Servico } from '@/data/servicos'
import { linkWhatsApp } from '@/data/salao'
import { modoRevisao } from '@/lib/modo'
import { cn } from '@/lib/utils'
import { Comanda } from './comanda/Comanda'
import { useComanda } from './comanda/contexto'
import { FitaCrepe } from './FitaCrepe'
import { FotoColada } from './FotoColada'
import { Seta } from './Rabiscos'
import { Sheet, SheetContent, SheetDescription, SheetTitle } from './ui/sheet'

/*
  A tabela de preços pregada na parede: uma lista com pontilhado até o preço.
  Tocar num serviço põe ele na comanda. Nada de cards, nada de ícones.
*/

const fitaPedaco =
  'polygon(0 10%, 5% 0, 95% 6%, 100% 0, 98% 50%, 100% 92%, 94% 100%, 6% 94%, 0 100%, 2% 50%)'

function Marca({ marcado }: { marcado: boolean }) {
  return (
    <svg viewBox="0 0 32 32" className="size-7 shrink-0 text-cafe" aria-hidden="true">
      <g filter="url(#rabisco)" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="5" width="23" height="22" stroke="currentColor" strokeWidth="1.8" />
        {marcado && <path d="M8,16 L14,23 L30,2" stroke="var(--color-rosa-tinta)" strokeWidth="3.4" />}
      </g>
    </svg>
  )
}

function Linha({ s }: { s: Servico }) {
  const { itens, alternar } = useComanda()
  const marcado = itens.includes(s.id)
  return (
    <li>
      <button
        type="button"
        aria-pressed={marcado}
        onClick={() => alternar(s.id)}
        className="group/linha flex min-h-14 w-full cursor-pointer items-end gap-3 py-2 text-left"
      >
        <Marca marcado={marcado} />
        <span className="flex min-w-0 flex-1 items-end gap-2">
          <span className="font-titulo text-[1.55rem] leading-[1.05] md:text-[1.9rem]">
            {/* o "+" da Gloock é miudinho: vai na letra do texto, com espaço de verdade em volta */}
            {s.nome.split(' + ').map((parte, i) => (
              <span key={parte}>
                {i > 0 && (
                  <>
                    {' '}
                    <span className="align-[0.08em] font-texto text-[0.75em] font-bold">+</span>{' '}
                  </>
                )}
                {parte}
              </span>
            ))}
          </span>
          <span className="mb-1.5 min-w-6 flex-1 border-b-2 border-dotted border-cafe/50" />
        </span>
        {s.preco && (
          <span className="mb-0.5 shrink-0 font-texto text-[1.1rem] font-bold whitespace-nowrap tabular-nums">{s.preco}</span>
        )}
      </button>
    </li>
  )
}

function Tabela() {
  return (
    <div className="relative md:-rotate-[0.6deg]">
      {/* fita crepe segurando a tabela na parede */}
      <span className="absolute -top-3 left-8 z-10 h-7 w-24 -rotate-6 bg-fita/90" style={{ clipPath: fitaPedaco }} aria-hidden="true" />
      <span className="absolute -top-3 right-10 z-10 h-7 w-20 rotate-[8deg] bg-fita/90" style={{ clipPath: fitaPedaco }} aria-hidden="true" />

      <div className="border-2 border-cafe bg-[#fbf7ef] px-5 pt-8 pb-7 md:px-10 md:pt-10">
        {modoRevisao && (
          <p className="-mt-2 mb-4">
            <FitaCrepe tipo="CONFIRMAR">se os preços estão atuais (vieram de um post do Instagram)</FitaCrepe>
          </p>
        )}

        {cardapio.map((g) => (
          <div key={g.id} className="mt-4 first:mt-0">
            <h3 className="font-mao text-[2.1rem] leading-none text-rosa-tinta">{g.titulo}</h3>
            <ul className="mt-1">
              {g.servicos.map((s) => (
                <Linha key={s.id} s={s} />
              ))}
            </ul>
          </div>
        ))}

        <p className="mt-6 border-t border-dashed border-cafe/40 pt-4 text-[0.98rem] text-cafe-suave">
          Não achou o que queria?{' '}
          <a
            href={linkWhatsApp('Oi, Márcia! Vim pelo site da Linda Flor e queria tirar uma dúvida.')}
            target="_blank"
            rel="noopener"
            className="font-bold text-rosa-tinta underline decoration-2 underline-offset-4"
          >
            Pergunta pra Márcia
          </a>
          .
        </p>
      </div>
    </div>
  )
}

/* Barra fixa do celular: WhatsApp direto sempre à mão, e a comanda quando tiver algo nela. */
function BarraCelular() {
  const { itens, aberta, setAberta } = useComanda()
  const n = itens.length
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-stretch border-t-2 border-cafe bg-papel pb-[env(safe-area-inset-bottom)] md:hidden">
        <a
          href={linkWhatsApp('Oi, Márcia! Vim pelo site da Linda Flor e queria marcar um horário.')}
          target="_blank"
          rel="noopener"
          className="flex min-h-14 flex-1 items-center justify-center font-bold text-rosa-tinta underline decoration-2 underline-offset-4"
        >
          Falar com a Márcia
        </a>
        <button
          type="button"
          onClick={() => setAberta(true)}
          className={cn(
            'flex min-h-14 flex-1 cursor-pointer items-center justify-center gap-2 border-l-2 border-cafe font-bold',
            n > 0 ? 'bg-rosa text-cafe' : 'text-cafe',
          )}
        >
          Comanda
          <span className="font-mao text-[1.7rem] leading-none font-normal">({n})</span>
        </button>
      </div>

      <Sheet open={aberta} onOpenChange={setAberta}>
        <SheetContent className="px-5 md:hidden" aria-describedby="comanda-desc">
          <SheetTitle className="sr-only">Comanda</SheetTitle>
          <SheetDescription id="comanda-desc" className="sr-only">
            Escolha dia e turno e mande a mensagem pronta pelo WhatsApp.
          </SheetDescription>
          <Comanda idTitulo="comanda-celular" className="pt-3" />
        </SheetContent>
      </Sheet>
    </>
  )
}

export function Cardapio() {
  return (
    <section id="cardapio" className="relative scroll-mt-4 px-4 pt-16 pb-4 md:px-[4vw] md:pt-[7vw] md:pb-0" aria-labelledby="titulo-cardapio">
      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(19rem,24rem)] md:gap-[5vw]">
        <div>
          <div className="relative mb-10 md:mb-14 md:pl-[6vw]">
            <h2 id="titulo-cardapio" className="font-titulo text-[2.6rem] leading-[1.02] md:text-[4.2vw]">
              Escolhe o que
              <br />
              vai fazer.
            </h2>
            <p className="mt-3 flex items-start gap-2 font-mao text-[1.75rem] leading-tight text-rosa-tinta">
              <span>toca no serviço que ele vai pra comanda</span>
              <Seta className="mt-1 hidden w-12 rotate-[75deg] md:block" />
            </p>

            {/* fotos coladas na parede, por cima da borda da tabela (desktop) */}
            <FotoColada foto="verde" proporcao="1 / 0.92" foco="center 25%" className="absolute -top-[3vw] right-[1vw] z-20 hidden w-[14vw] rotate-[5deg] md:block" />
            <FotoColada foto="branco" fita="cantos" className="absolute top-[0.5vw] right-[15.5vw] z-20 hidden w-[9vw] -rotate-[8deg] md:block" />
          </div>

          {/* no celular: duas fotos meio encavaladas antes da tabela */}
          <div className="relative z-20 -mt-2 mb-[-1.5rem] flex items-start md:hidden">
            <FotoColada foto="verde" proporcao="1 / 0.92" foco="center 25%" className="ml-2 w-[50%] -rotate-3" />
            <FotoColada foto="branco" fita="cantos" className="mt-8 -ml-6 w-[40%] rotate-6" />
          </div>

          <Tabela />
          <FotoColada foto="vinho" className="relative z-10 mt-[-1.5rem] ml-auto w-[46%] rotate-3 md:mt-[-3vw] md:mr-[10%] md:w-[12vw] md:-rotate-[4deg]" />
        </div>

        {/* comanda presa ao lado (desktop) */}
        <aside className="hidden md:block" aria-labelledby="comanda-lado">
          <div className="sticky top-6 mt-[7vw]">
            <div className="relative rotate-[1.2deg] border-2 border-cafe bg-[#fffdf8] px-6 pt-8 pb-7">
              <span className="absolute -top-3.5 left-1/2 z-10 h-8 w-28 -translate-x-1/2 -rotate-2 bg-fita/90" style={{ clipPath: fitaPedaco }} aria-hidden="true" />
              <Comanda idTitulo="comanda-lado" />
            </div>
          </div>
        </aside>
      </div>

      <BarraCelular />
    </section>
  )
}
