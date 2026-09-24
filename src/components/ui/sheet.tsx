import * as DialogPrimitive from '@radix-ui/react-dialog'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'

/*
  Sheet do shadcn (Radix Dialog), reestilizado como uma folha de papel que sobe de baixo,
  com a borda de cima picotada. Sem cantos arredondados, sem sombra de "card".
*/

export const Sheet = DialogPrimitive.Root
export const SheetTrigger = DialogPrimitive.Trigger
export const SheetClose = DialogPrimitive.Close
export const SheetTitle = DialogPrimitive.Title
export const SheetDescription = DialogPrimitive.Description

const picote =
  'polygon(0 10px, 4% 0, 8% 10px, 12% 0, 16% 10px, 20% 0, 24% 10px, 28% 0, 32% 10px, 36% 0, 40% 10px, 44% 0, 48% 10px, 52% 0, 56% 10px, 60% 0, 64% 10px, 68% 0, 72% 10px, 76% 0, 80% 10px, 84% 0, 88% 10px, 92% 0, 96% 10px, 100% 0, 100% 100%, 0 100%)'

export function SheetContent({ className, children, ...props }: ComponentProps<typeof DialogPrimitive.Content> & { children: ReactNode }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-cafe/45 data-[state=open]:animate-[aparecer_200ms_ease-out]" />
      <DialogPrimitive.Content
        className={cn(
          'fixed inset-x-0 bottom-0 z-50 max-h-[92svh] overflow-y-auto bg-papel pt-5 pb-[max(1rem,env(safe-area-inset-bottom))]',
          'data-[state=open]:motion-safe:animate-[subir_280ms_cubic-bezier(.2,.8,.2,1)]',
          className,
        )}
        style={{ clipPath: picote }}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}
