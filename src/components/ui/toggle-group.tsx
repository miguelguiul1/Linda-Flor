import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import type { ComponentProps } from 'react'
import { Circulo } from '@/components/Rabiscos'
import { cn } from '@/lib/utils'

/*
  ToggleGroup do shadcn (Radix), reestilizado: cada opção é uma palavra escrita,
  e a escolhida ganha um círculo de caneta em volta. Alvo de toque mínimo 44x44.
*/

export function ToggleGroup({ className, ...props }: ComponentProps<typeof ToggleGroupPrimitive.Root>) {
  return <ToggleGroupPrimitive.Root className={cn('flex flex-wrap gap-x-1 gap-y-1', className)} {...props} />
}

export function ToggleGroupItem({ className, children, ...props }: ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  return (
    <ToggleGroupPrimitive.Item
      className={cn(
        'group/opcao relative inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center px-2.5 font-texto text-[1rem] text-cafe-suave',
        'hover:text-cafe data-[state=on]:font-bold data-[state=on]:text-cafe',
        className,
      )}
      {...props}
    >
      <Circulo className="pointer-events-none absolute inset-x-0 inset-y-1 hidden h-[calc(100%-0.5rem)] w-full text-rosa-tinta group-data-[state=on]/opcao:block" />
      <span className="relative">{children}</span>
    </ToggleGroupPrimitive.Item>
  )
}
