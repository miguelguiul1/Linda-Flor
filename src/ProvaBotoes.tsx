import { FiltrosDesenho } from '@/components/Sombrinha'
import { Botao } from '@/components/ui/button'

/* Página de prova (?provas=botoes): as três formas de botão lado a lado para aprovação. */

const opcoes = [
  { forma: 'etiqueta', nome: 'A · Etiqueta de preço', nota: 'furo e barbante; no hover gira no furo' },
  { forma: 'fita', nome: 'B · Papel com fita crepe', nota: 'fita no canto; no hover o papel sobe e a fita desgruda um pouco' },
  { forma: 'canhoto', nome: 'C · Canhoto de comanda', nota: 'picote e “nº 191” (o número da porta); no hover sobe' },
] as const

export default function ProvaBotoes() {
  return (
    <main className="min-h-svh px-[6vw] py-14">
      <FiltrosDesenho />
      <h1 className="font-titulo text-5xl">Botão: três papéis do salão</h1>
      <p className="mt-2 font-mao text-3xl text-rosa-tinta">no lugar da sombra dura deslocada</p>
      <div className="mt-12 grid gap-14 md:grid-cols-3">
        {opcoes.map((o) => (
          <section key={o.forma}>
            <h2 className="font-titulo text-2xl">{o.nome}</h2>
            <p className="mt-1 mb-8 text-cafe-suave">{o.nota}</p>
            <div className="flex flex-col items-start gap-8 pl-8">
              <Botao forma={o.forma} tamanho="grande">Marcar meu horário</Botao>
              <Botao forma={o.forma}>Mandar pro WhatsApp</Botao>
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
