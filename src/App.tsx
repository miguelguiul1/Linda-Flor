import { Avaliacoes } from '@/components/Avaliacoes'
import { Cafe } from '@/components/Cafe'
import { Cardapio } from '@/components/Cardapio'
import { ComandaProvider } from '@/components/comanda/contexto'
import { ComoChegar } from '@/components/ComoChegar'
import { Forro, Hero } from '@/components/Hero'
import { Rodape } from '@/components/Rodape'
import { FiltrosDesenho } from '@/components/Sombrinha'

export default function App() {
  return (
    <ComandaProvider>
      <FiltrosDesenho />
      <Forro />
      <main className="overflow-x-clip">
        <Hero />
        <Cardapio />
        <Cafe />
        <Avaliacoes />
        <ComoChegar />
      </main>
      <Rodape />
    </ComandaProvider>
  )
}
