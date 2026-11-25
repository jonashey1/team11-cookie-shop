'use client'

import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { usePathname } from 'next/navigation'
import { ShoppingBag, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ButtonLink } from './ButtonLink'
import { BasketLines } from './BasketLines'
import { formatOrderAmount, useOrderBasket } from './OrderBasket'

export function GlobalBasket({ onOpenChange }: { onOpenChange: (open: boolean) => void }) {
  const { products, itemCount, total, pending } = useOrderBasket()
  const onCheckoutPage = usePathname() === '/clinics'
  const [open, setOpen] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const followingCheckout = useRef(false)
  const summary = `${itemCount} ${itemCount === 1 ? 'item' : 'items'} · ${formatOrderAmount(total)}`

  useEffect(() => {
    if (!open) return
    const before = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = before }
  }, [open])

  function showBasket() {
    dialog.current?.showModal()
    heading.current?.focus()
    setOpen(true)
    onOpenChange(true)
  }

  function afterClose() {
    setOpen(false)
    onOpenChange(false)
    if (!followingCheckout.current) trigger.current?.focus({ preventScroll: true })
    followingCheckout.current = false
  }

  function goToCheckout(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    followingCheckout.current = true
    dialog.current?.close()
  }

  return (
    <>
      <Button ref={trigger} type="button" variant="secondary" size="icon"
        className="relative bg-blue-tint" onClick={showBasket}
        aria-label={`Open basket (${itemCount} ${itemCount === 1 ? 'item' : 'items'})`} aria-haspopup="dialog">
        <ShoppingBag aria-hidden="true" className="size-5" />
        {itemCount > 0 && <span data-testid="basket-count" aria-hidden="true"
          className="absolute end-0 top-0 rounded-full bg-ink px-1 text-xs leading-tight tabular-nums text-canvas">{itemCount}</span>}
      </Button>
      {!open && <span className="sr-only" role="status">Basket: {summary}</span>}
      <dialog ref={dialog} onClose={afterClose} aria-labelledby="global-basket-heading" className="global-basket border-s border-line bg-canvas text-ink">
        <div className="flex h-full min-h-0 flex-col">
          <div className="flex shrink-0 items-start justify-between gap-2 border-b border-line p-3 sm:p-5">
            <div className="min-w-0">
              <h2 ref={heading} tabIndex={-1} id="global-basket-heading" className="text-2xl">Your basket</h2>
              <p className="mt-1 text-sm text-ink-soft">One item is one loose cookie or one four-cookie box.</p>
            </div>
            <Button type="button" variant="secondary" size="icon" aria-label="Close basket" onClick={() => dialog.current?.close()}><X aria-hidden="true" /></Button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 sm:p-5">
            {open && (itemCount ? <BasketLines onRemove={() => heading.current?.focus({ preventScroll: true })} /> : (
              <div className="grid gap-3 rounded-frame border border-line bg-yellow-wash p-4">
                <ShoppingBag aria-hidden="true" className="size-6 text-link" />
                <p className="font-heading text-xl">{products.length
                  ? 'Your basket is waiting for something sweet.'
                  : 'The cookie catalogue is temporarily unavailable. Saved selections stay in this browser.'}</p>
              </div>
            ))}
          </div>
          <div className="global-basket-footer grid shrink-0 gap-2 border-t border-line bg-yellow-wash p-3 sm:p-5">
            {itemCount > 0 && <>
              <p className="flex flex-wrap justify-between gap-1 font-bold"><span>Subtotal</span><span className="tabular-nums">{formatOrderAmount(total)}</span></p>
              {open && <span className="sr-only" role="status">Basket: {summary}</span>}
              {!pending && (onCheckoutPage ? (
                <Button asChild className="whitespace-normal text-center">
                  {/* A same-page link replaces an existing Box Builder fragment. */}
                  <a href="#customer-details" onClick={goToCheckout}>Proceed to checkout</a>
                </Button>
              ) : <ButtonLink className="whitespace-normal text-center" href="/clinics#customer-details" onClick={goToCheckout}>Proceed to checkout</ButtonLink>)}
            </>}
            {open && itemCount === 0 && <span className="sr-only" role="status">Basket is empty.</span>}
            <ButtonLink variant="secondary" className="whitespace-normal text-center" href="/cookies" onClick={() => dialog.current?.close()}>
              {itemCount ? 'Continue shopping' : 'Explore our cookies'}
            </ButtonLink>
          </div>
        </div>
      </dialog>
    </>
  )
}
