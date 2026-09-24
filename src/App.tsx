import { Cardapio } from '@/components/Cardapio'
import { ComandaProvider } from '@/components/comanda/contexto'
import { Forro, Hero } from '@/components/Hero'
import { FiltrosDesenho } from '@/components/Sombrinha'

export default function App() {
  return (
    <ComandaProvider>
      <FiltrosDesenho />
      <Forro />
      {/* pb no celular: espaço da barra fixa de WhatsApp/comanda */}
      <main className="pb-16 md:pb-0">
        <Hero />
        <Cardapio />
      </main>
    </ComandaProvider>
  )
}
