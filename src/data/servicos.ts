/*
  Cardápio do salão. Só entra aqui o que se sabe.
  - naMensagem: como o serviço entra na frase do WhatsApp ("Queria marcar ___")
*/

export type Servico = {
  id: string
  nome: string
  preco: string | null
  naMensagem: string
  /* o que o serviço "contém": dois serviços com parte em comum não entram juntos na comanda */
  partes: string[]
}

export type Grupo = {
  id: string
  titulo: string // escrito à mão
  servicos: Servico[]
}

// Nomes e preços do post de tabela no Instagram do salão. [CONFIRMAR] se os preços estão atuais.
export const cardapio: Grupo[] = [
  {
    id: 'maos-pes',
    titulo: 'mãos e pés',
    servicos: [
      { id: 'manicure', nome: 'Manicure', preco: 'R$ 35', naMensagem: 'manicure', partes: ['mao'] },
      { id: 'pedicure', nome: 'Pedicure', preco: 'R$ 35', naMensagem: 'pedicure', partes: ['pe'] },
      { id: 'mani-pedi', nome: 'Manicure e Pedicure', preco: 'R$ 60', naMensagem: 'manicure e pedicure', partes: ['mao', 'pe'] },
      { id: 'esmaltacao', nome: 'Esmaltação', preco: 'R$ 15', naMensagem: 'esmaltação', partes: ['esmaltacao'] },
      {
        id: 'plastica-pedicure',
        nome: 'Plástica dos pés + Pedicure',
        preco: 'R$ 70',
        naMensagem: 'plástica dos pés com pedicure',
        partes: ['pe', 'plastica'],
      },
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

/* Marcar um serviço tira os que têm parte em comum com ele
   (ex.: "Manicure e Pedicure" tira "Manicure" e "Pedicure"), pra mensagem não sair repetida. */
export function alternarServico(itens: string[], id: string) {
  if (itens.includes(id)) return itens.filter((x) => x !== id)
  const partes = todosServicos.find((s) => s.id === id)?.partes ?? []
  const semConflito = itens.filter((x) => {
    const outro = todosServicos.find((s) => s.id === x)
    return !outro?.partes.some((p) => partes.includes(p))
  })
  return [...semConflito, id]
}

function juntar(itens: string[]) {
  if (itens.length <= 1) return itens.join('')
  return `${itens.slice(0, -1).join(', ')} e ${itens[itens.length - 1]}`
}

/* Mensagem aprovada. Não tirar o "Vim pelo site da Linda Flor": é como a Márcia mede quantas clientes o site traz. */
export function montarMensagem(ids: string[], dia: DiaId | null, turno: TurnoId | null) {
  const nomes = todosServicos.filter((s) => ids.includes(s.id)).map((s) => s.naMensagem)
  const oque = nomes.length ? juntar(nomes) : 'um horário'
  const quando = [dias.find((d) => d.id === dia)?.frase, turnos.find((t) => t.id === turno)?.frase]
    .filter(Boolean)
    .join(' ')
  return `Oi, Márcia! Vim pelo site da Linda Flor. Queria marcar ${oque}${quando ? ` ${quando}` : ''}. Tem vaga?`
}
