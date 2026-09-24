/*
  Dois modos do mesmo site:
  - revisão (padrão): mostra as etiquetas de fita crepe com o que falta descobrir ou revisar
  - apresentação (?apresentacao=1 ou VITE_MODO=apresentacao): esconde preços e pendências
    não essenciais e troca as etiquetas de foto por ilustrações neutras. Nada é inventado, só ocultado.
*/
const params = new URLSearchParams(window.location.search)

export const modoApresentacao =
  params.get('apresentacao') === '1' || import.meta.env.VITE_MODO === 'apresentacao'

export const modoRevisao = !modoApresentacao
