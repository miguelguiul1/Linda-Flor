// Tudo o que é fato sobre o salão fica aqui. O que ainda não se sabe fica como null + comentário.

export const salao = {
  nome: 'Linda Flor',
  subtitulo: 'Espaço Beleza',
  endereco: {
    rua: 'Av. Juan Esper, 191',
    bairro: 'Veleiros',
    cidade: 'São Paulo',
    uf: 'SP',
    cep: '04771-000',
    referencia: null as string | null, // [DESCOBRIR] ponto de referência para chegar
  },
  telefone: '(11) 96436-2474',
  whatsapp: '5511964362474',
  instagram: 'lindaflorbelezaa',
  dias: 'Terça a sábado',
  abre: '9h',
  fecha: null as string | null, // [CONFIRMAR] Instagram diz 18h, Google diz 19h
  google: { nota: '5,0', avaliacoes: 41 },
} as const

export function linkWhatsApp(mensagem?: string) {
  const base = `https://wa.me/${salao.whatsapp}`
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base
}
