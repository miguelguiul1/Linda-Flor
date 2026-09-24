import { Forro, Hero } from '@/components/Hero'
import { FiltrosDesenho } from '@/components/Sombrinha'

export default function App() {
  return (
    <>
      <FiltrosDesenho />
      <Forro />
      <main>
        <Hero />
      </main>
    </>
  )
}
