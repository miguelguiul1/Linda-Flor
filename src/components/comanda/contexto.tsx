import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { alternarServico, montarMensagem, type DiaId, type TurnoId } from '@/data/servicos'

type Comanda = {
  itens: string[]
  alternar: (id: string) => void
  tirar: (id: string) => void
  dia: DiaId | null
  setDia: (d: DiaId | null) => void
  turno: TurnoId | null
  setTurno: (t: TurnoId | null) => void
  mensagem: string
  aberta: boolean
  setAberta: (v: boolean) => void
}

const Ctx = createContext<Comanda | null>(null)

export function ComandaProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<string[]>([])
  const [dia, setDia] = useState<DiaId | null>(null)
  const [turno, setTurno] = useState<TurnoId | null>(null)
  const [aberta, setAberta] = useState(false)

  const valor = useMemo<Comanda>(
    () => ({
      itens,
      alternar: (id) => setItens((xs) => alternarServico(xs, id)),
      tirar: (id) => setItens((xs) => xs.filter((x) => x !== id)),
      dia,
      setDia,
      turno,
      setTurno,
      mensagem: montarMensagem(itens, dia, turno),
      aberta,
      setAberta,
    }),
    [itens, dia, turno, aberta],
  )

  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>
}

export function useComanda() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useComanda fora do ComandaProvider')
  return c
}
