import { linkGoogle } from '@/data/avaliacoes'
import { salao } from '@/data/salao'
import { cn } from '@/lib/utils'
import { Circulo } from './Rabiscos'

/*
  "5,0 · 41 avaliações no Google", circulado à caneta.
  Tudo em texto corrido (sem flex nos filhos: flex descarta os espaços entre itens),
  pra leitor de tela e copiar/colar lerem exatamente "5,0 · 41 avaliações no Google".
  Na versão grande a contagem desce de linha só visualmente (inline-block w-full)
  e o "·" fica num inline-block de largura zero: some da tela, continua no texto.
*/

export function NotaGoogle({ grande = false, className }: { grande?: boolean; className?: string }) {
  const { nota, avaliacoes } = salao.google
  return (
    <a
      href={linkGoogle}
      target="_blank"
      rel="noopener"
      className={cn('relative inline-block w-fit text-cafe no-underline', grande ? 'px-12 py-9' : 'px-9 py-6', className)}
    >
      <Circulo className="absolute inset-0 h-full w-full text-rosa-tinta" />
      <span className={cn('relative font-titulo leading-none', grande ? 'text-[5.5rem]' : 'text-5xl')}>{nota}</span>
      <span className={cn('whitespace-pre', grande && 'inline-block w-0 overflow-hidden')}>{' · '}</span>
      <span
        className={cn(
          'relative font-mao leading-none whitespace-nowrap',
          grande ? 'mt-2 inline-block w-full text-[1.9rem]' : 'text-[1.6rem]',
        )}
      >
        {avaliacoes} avaliações no Google
      </span>
    </a>
  )
}
