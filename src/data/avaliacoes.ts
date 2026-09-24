/*
  Avaliações reais do Google, coladas pelo responsável do site. NÃO inventar nem reescrever.
  - texto: o texto da avaliação, exatamente como está no Google
  - nome: só o primeiro nome da pessoa
  Enquanto texto for null, o bilhete aparece como [COLAR AVALIAÇÃO REAL] no modo revisão
  e some no modo apresentação.
*/

export type Avaliacao = { texto: string | null; nome: string | null }

export const avaliacoes: Avaliacao[] = [
  { texto: null, nome: null },
  { texto: null, nome: null },
  { texto: null, nome: null },
]

// Busca no Maps pelo nome + endereço. [CONFIRMAR] trocar pelo link direto do perfil da empresa no Google.
export const linkGoogle =
  'https://www.google.com/maps/search/?api=1&query=Linda+Flor+Espa%C3%A7o+Beleza+Av.+Juan+Esper+191+S%C3%A3o+Paulo'
