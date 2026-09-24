import { dias, todosServicos, turnos, type DiaId, type TurnoId } from '@/data/servicos'
import { linkWhatsApp } from '@/data/salao'
import { FitaCrepe } from '@/components/FitaCrepe'
import { Botao } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { cn } from '@/lib/utils'
import { useComanda } from './contexto'

/*
  A comanda de papel: o que a cliente escolheu + dia + turno → mensagem pronta no WhatsApp.
  O mesmo miolo aparece preso ao lado da tabela (desktop) e na folha que sobe (celular).
*/

export function Comanda({ className, idTitulo }: { className?: string; idTitulo: string }) {
  const { itens, tirar, dia, setDia, turno, setTurno, mensagem } = useComanda()
  const escolhidos = todosServicos.filter((s) => itens.includes(s.id))

  return (
    <div className={cn('relative', className)}>
      <div className="flex items-baseline justify-between border-b-2 border-cafe pb-2">
        <h3 id={idTitulo} className="font-titulo text-[1.9rem] leading-none">
          Comanda
        </h3>
        <span className="font-mao text-[1.6rem] leading-none text-cafe-suave">nº ____</span>
      </div>

      {/* o que vai fazer */}
      <div className="min-h-[5.5rem] border-b border-dashed border-cafe/40 py-3" aria-live="polite">
        {escolhidos.length === 0 ? (
          <p className="pt-1 font-mao text-[1.65rem] leading-tight text-cafe-suave">
            ainda vazia. escolhe na tabela
            <span className="hidden md:inline"> ao lado</span>
            <span className="md:hidden"> de preços</span>
          </p>
        ) : (
          <ul className="space-y-0.5">
            {escolhidos.map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-2">
                <span className="font-mao text-[2rem] leading-none">{s.nome}</span>
                <button
                  type="button"
                  onClick={() => tirar(s.id)}
                  className="-mr-2 inline-flex size-11 cursor-pointer items-center justify-center text-cafe-suave hover:text-rosa-tinta"
                  aria-label={`Tirar ${s.nome} da comanda`}
                >
                  <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true">
                    <path d="M4,4 L16,16 M16,4 L4,16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" filter="url(#rabisco)" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <fieldset className="mt-4">
        <legend className="text-[0.95rem] font-bold">Que dia?</legend>
        <ToggleGroup
          type="single"
          value={dia ?? ''}
          onValueChange={(v) => setDia((v || null) as DiaId | null)}
          aria-label="Dia da semana"
          className="-ml-2.5"
        >
          {dias.map((d) => (
            <ToggleGroupItem key={d.id} value={d.id}>
              {d.curto}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </fieldset>

      <fieldset className="mt-3">
        <legend className="text-[0.95rem] font-bold">Que turno?</legend>
        <ToggleGroup
          type="single"
          value={turno ?? ''}
          onValueChange={(v) => setTurno((v || null) as TurnoId | null)}
          aria-label="Turno"
          className="-ml-2.5"
        >
          {turnos.map((t) => (
            <ToggleGroupItem key={t.id} value={t.id}>
              {t.curto}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </fieldset>

      <div className="mt-5">
        <p className="font-mao text-[1.45rem] leading-none text-rosa-tinta">vai assim pro WhatsApp:</p>
        <p className="mt-2 border-l-2 border-rosa pl-3 text-[0.98rem] leading-snug">{mensagem}</p>
        <FitaCrepe className="mt-2">texto da mensagem</FitaCrepe>
      </div>

      <div className="mt-6 pl-8">
        <Botao href={linkWhatsApp(mensagem)} target="_blank" rel="noopener" className="w-full">
          Mandar pro WhatsApp
        </Botao>
      </div>

      <p className="mt-5 text-[0.95rem] text-cafe-suave">
        Aqui o horário marcado é respeitado. <FitaCrepe />
      </p>
    </div>
  )
}
