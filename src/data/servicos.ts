/*
  Cardápio do salão. Só entra aqui o que se sabe; o resto fica marcado.
  - confirmado: false → aparece só no modo revisão (no modo apresentação some)
  - preco: null → "R$ [DESCOBRIR]" no modo revisão; "consulte pelo WhatsApp" no modo apresentação
  - naMensagem: como o serviço entra na frase do WhatsApp ("Queria marcar ___")
*/

export type Servico = {
  id: string
  nome: string
  nota?: string
  preco: string | null
  confirmado: boolean
  naMensagem: string
}

export type Grupo = {
  id: string
  titulo: string // escrito à mão
  confirmado: boolean
  servicos: Servico[]
}

export const cardapio: Grupo[] = [
  {
    id: 'maos-pes',
    titulo: 'mãos e pés',
    confirmado: true,
    servicos: [
      { id: 'mao', nome: 'Mão', nota: 'manicure', preco: null, confirmado: true, naMensagem: 'mão' },
      { id: 'pe', nome: 'Pé', nota: 'pedicure', preco: null, confirmado: true, naMensagem: 'pé' },
      // [CONFIRMAR] se existe o combo e se tem preço próprio
      { id: 'pe-mao', nome: 'Pé e mão', nota: 'os dois juntos', preco: null, confirmado: false, naMensagem: 'pé e mão' },
    ],
  },
  {
    // [DESCOBRIR] a cliente ainda vai confirmar se o salão faz estes
    id: 'outros',
    titulo: 'o que mais tem?',
    confirmado: false,
    servicos: [
      { id: 'sobrancelha', nome: 'Sobrancelha', preco: null, confirmado: false, naMensagem: 'sobrancelha' },
      { id: 'cabelo', nome: 'Cabelo', preco: null, confirmado: false, naMensagem: 'cabelo' },
      { id: 'depilacao', nome: 'Depilação', preco: null, confirmado: false, naMensagem: 'depilação' },
    ],
  },
]

export const todosServicos = cardapio.flatMap((g) => g.servicos)

export const dias = [
  { id: 'ter', curto: 'ter', frase: 'na terça' },
  { id: 'qua', curto: 'qua', frase: 'na quarta' },
  { id: 'qui', curto: 'qui', frase: 'na quinta' },
  { id: 'sex', curto: 'sex', frase: 'na sexta' },
  { id: 'sab', curto: 'sáb', frase: 'no sábado' },
  { id: 'tanto-faz', curto: 'tanto faz', frase: '' },
] as const

export const turnos = [
  { id: 'manha', curto: 'manhã', frase: 'de manhã' },
  { id: 'tarde', curto: 'tarde', frase: 'à tarde' },
  { id: 'tanto-faz', curto: 'tanto faz', frase: '' },
] as const

export type DiaId = (typeof dias)[number]['id']
export type TurnoId = (typeof turnos)[number]['id']

/* "Pé e mão" já é mão + pé: marcar um tira os outros, pra mensagem não sair "pé e pé e mão". */
const combos: Record<string, string[]> = { 'pe-mao': ['mao', 'pe'] }

export function alternarServico(itens: string[], id: string) {
  if (itens.includes(id)) return itens.filter((x) => x !== id)
  const partes = combos[id] ?? []
  const combosQueContem = Object.keys(combos).filter((c) => combos[c].includes(id))
  return [...itens.filter((x) => !partes.includes(x) && !combosQueContem.includes(x)), id]
}

function juntar(itens: string[]) {
  if (itens.length <= 1) return itens.join('')
  return `${itens.slice(0, -1).join(', ')} e ${itens[itens.length - 1]}`
}

/* [REVISAR] tom da mensagem pronta */
export function montarMensagem(ids: string[], dia: DiaId | null, turno: TurnoId | null) {
  const nomes = todosServicos.filter((s) => ids.includes(s.id)).map((s) => s.naMensagem)
  const oque = nomes.length ? juntar(nomes) : 'um horário'
  const quando = [dias.find((d) => d.id === dia)?.frase, turnos.find((t) => t.id === turno)?.frase]
    .filter(Boolean)
    .join(' ')
  return `Oi! Vim pelo site da Linda Flor. Queria marcar ${oque}${quando ? ` ${quando}` : ''}. Tem vaga?`
}
