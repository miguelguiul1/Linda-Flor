import { linkGoogle } from '@/data/avaliacoes'
import { salao } from '@/data/salao'
import { cn } from '@/lib/utils'
import { Circulo } from './Rabiscos'

/*
  "5,0 · 41 avaliações no Google", circulado à caneta.
  Nota e contagem ficam na mesma linha, com o "·" no texto de verdade:
  assim nunca vira "5,041" (leitor de tela, copiar e colar, prévia de link).
*/

export function NotaGoogle({ grande = false, className }: { grande?: boolean; className?: string }) {
  const { nota, avaliacoes } = salao.google
  return (
    <a
      href={linkGoogle}
      target="_blank"
      rel="noopener"
      aria-label={`Nota ${nota} no Google, com ${avaliacoes} avaliações`}
      className={cn('relative inline-flex w-fit items-baseline gap-x-2 text-cafe no-underline', grande ? 'flex-col px-12 py-9' : 'flex-wrap px-9 py-6', className)}
    >
      <Circulo className="absolute inset-0 h-full w-full text-rosa-tinta" />
      <span className={cn('font-titulo leading-none', grande ? 'text-[5.5rem]' : 'text-5xl')}>{nota}</span>{' '}
      <span className={cn('font-mao leading-none whitespace-nowrap', grande ? 'mt-2 text-[1.9rem]' : 'text-[1.6rem]')}>
        {/* na versão grande a contagem vai na linha de baixo: o "·" fica só no texto (leitor de tela, copiar) */}
        <span className={cn(grande && 'sr-only')}>· </span>
        {avaliacoes} avaliações no Google
      </span>
    </a>
  )
}
