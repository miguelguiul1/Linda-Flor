/*
  Avaliações reais do Google, coladas pelo responsável do site. NÃO inventar nem reescrever.
  - texto: o texto da avaliação, exatamente como está no Google
  - nome: só o primeiro nome da pessoa
  Enquanto texto for null, o bilhete aparece como [COLAR AVALIAÇÃO REAL] no modo revisão
  e some no modo apresentação.
*/

export type Avaliacao = { texto: string | null; nome: string | null }

// Copiadas exatamente do Google (com emoji, quebra de linha e pontuação): são as palavras das clientes.
export const avaliacoes: Avaliacao[] = [
  { texto: 'Amei! ❤️\nQualidade nos atendimentos com muita simpatia.', nome: 'Shirley' },
  { texto: 'Excelente atendimento, ambiente acolhedor e bom papo..Gratidão', nome: 'Cristiane' },
  { texto: null, nome: null },
]

// Busca no Maps pelo nome + endereço. [CONFIRMAR] trocar pelo link direto do perfil da empresa no Google.
export const linkGoogle =
  'https://www.google.com/maps/search/?api=1&query=Linda+Flor+Espa%C3%A7o+Beleza+Av.+Juan+Esper+191+S%C3%A3o+Paulo'
