'use client'

import { Cookie } from 'lucide-react'
import Image from 'next/image'
import { useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react'
import { Button } from '@/components/ui/button'
import { ButtonLink } from './ButtonLink'
import { useCookieCatalog } from './OrderBasket'
import { BOX_SUGGESTIONS, BOX_NAME_LIMIT, BOX_MESSAGE_LIMIT, boxPrice, boxPreviewText, emptyBox, parseSavedBox, type BoxCookieId, type BoxSlots } from '@/lib/cookie-box'
import { formatOrderAmount, useOrderBasket } from './OrderBasket'

type Picker = { slot: number } | { suggestion: keyof typeof BOX_SUGGESTIONS } | { saved: BoxSlots }

const SAVED_BOX_KEY = 'cookie-shop-saved-box'
const savedBoxEvent = 'cookie-shop-saved-box-change'

function subscribeSavedBox(listener: () => void) {
  window.addEventListener('storage', listener)
  window.addEventListener(savedBoxEvent, listener)
  return () => {
    window.removeEventListener('storage', listener)
    window.removeEventListener(savedBoxEvent, listener)
  }
}

function readSavedBox() {
  try { return localStorage.getItem(SAVED_BOX_KEY) } catch { return null }
}

export function CookieBoxBuilder() {
  const products = useCookieCatalog()
  const [slots, setSlots] = useState<BoxSlots>(emptyBox)
  const [picker, setPicker] = useState<Picker | null>(null)
  const [feedback, setFeedback] = useState('')
  const [boxName, setBoxName] = useState('')
  const [giftMessage, setGiftMessage] = useState('')
  const savedBox = parseSavedBox(useSyncExternalStore(subscribeSavedBox, readSavedBox, () => null))
  const dialog = useRef<HTMLDialogElement>(null)
  const slotList = useRef<HTMLUListElement>(null)
  const focusSlot = useRef<number | null>(null)
  const adding = useRef(false)
  const { pending, addBox } = useOrderBasket()
  const selection = slots.filter(id => id !== null)
  const remaining = slots.length - selection.length

  useLayoutEffect(() => {
    const index = focusSlot.current
    if (index === null) return
    focusSlot.current = null
    slotList.current?.children[index]?.querySelector('button')?.focus()
  }, [slots])

  function update(next: BoxSlots) {
    adding.current = false
    setSlots(next)
    setFeedback('')
  }

  function updateSlot(index: number, id: BoxCookieId | null) {
    const next: BoxSlots = [...slots]
    next[index] = id
    // Restore focus as the old slot button is replaced, before the next keystroke.
    focusSlot.current = index
    update(next)
  }

  function openPicker(next: Picker) {
    setPicker(next)
    dialog.current?.showModal()
  }

  function applySuggestion(suggestion: keyof typeof BOX_SUGGESTIONS) {
    if (selection.length) {
      openPicker({ suggestion })
      return
    }
    update([...BOX_SUGGESTIONS[suggestion]])
  }

  function saveCombination(remove = false) {
    try {
      if (remove) localStorage.removeItem(SAVED_BOX_KEY)
      else localStorage.setItem(SAVED_BOX_KEY, JSON.stringify(slots))
      window.dispatchEvent(new Event(savedBoxEvent))
      setFeedback(remove ? 'Saved combination removed.' : 'Combination saved on this browser.')
    } catch {
      setFeedback('Browser storage is unavailable.')
    }
  }

  function restoreCombination(saved: BoxSlots) {
    if (selection.length) openPicker({ saved })
    else update(saved)
  }

  function addToBasket() {
    if (adding.current || remaining || pending) return
    if (!addBox({ cookies: selection, name: boxName.trim(), message: giftMessage.trim() })) {
      setFeedback('Your basket can hold up to 20 of each flavour. Adjust it before adding this box.')
      return
    }
    adding.current = true
    setSlots(emptyBox())
    setFeedback('Box added to your basket.')
  }

  if (!products.length) return null

  return (
    <section aria-label="Cookie box builder" className="mx-auto grid w-full max-w-2xl min-w-0 gap-4 pb-block">
      <div className="grid gap-4 rounded-frame border-2 border-line bg-yellow-wash p-3 sm:p-6">
        <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 border-b border-line pb-2 font-semibold">
          <p role="status">{selection.length} of 4 selected</p>
          <p>Total: {formatOrderAmount(boxPrice(selection, products))}</p>
        </div>
        <div aria-hidden="true" className="boutique-box-lid"><Cookie /><span>Cookie Shop</span><small>Your perfect cookie box</small></div>
        {boxName.trim() && <p className="experience-kraft-label">{boxName}</p>}
        <ul ref={slotList} aria-label="Box slots" className="boutique-box-tray">
          {slots.map((id, index) => {
            const cookie = products.find(item => item.id === id)
            const image = cookie?.image

            return (
              <li key={index} data-flavour={cookie?.id} className="boutique-box-slot relative grid min-h-32 min-w-0 content-start sm:min-h-48">
                {cookie ? (
                  <>
                    <div className="boutique-slot-art relative aspect-[5/4] overflow-hidden rounded-t-frame">
                      {image && <Image src={image.src} alt="" width={480} height={720} sizes="(min-width: 768px) 480px, 90vw" />}
                    </div>
                    <div className="grid gap-1 px-2 py-2 sm:px-3">
                      <p className="font-heading font-bold break-words">{cookie.name}</p>
                      <p className="text-sm font-semibold tabular-nums">{formatOrderAmount(cookie.price)}</p>
                    </div>
                    <Button type="button" variant="secondary" size="icon" className="absolute end-1 top-1 rounded-full text-xl"
                      aria-label={`Remove ${cookie.name} from slot ${index + 1}`} onClick={() => updateSlot(index, null)}>
                      <span aria-hidden="true">×</span>
                    </Button>
                  </>
                ) : (
                  <Button type="button" variant="quiet" className="absolute inset-0 h-full min-h-32 w-full flex-col gap-1 px-2 whitespace-normal sm:min-h-48"
                    aria-label={`Add a cookie to slot ${index + 1}`} aria-haspopup="dialog" onClick={() => openPicker({ slot: index })}>
                    <span aria-hidden="true" className="text-2xl leading-none">+</span>
                    Add a cookie
                  </Button>
                )}
              </li>
            )
          })}
        </ul>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="quiet" disabled={!selection.length} onClick={() => update(emptyBox())}>Reset box</Button>
          {(Object.keys(BOX_SUGGESTIONS) as (keyof typeof BOX_SUGGESTIONS)[]).map(label => (
            <Button key={label} type="button" variant="secondary" className="whitespace-normal"
              aria-haspopup={selection.length ? 'dialog' : undefined} onClick={() => applySuggestion(label)}>{label}</Button>
          ))}
        </div>
        <details className="experience-box-tools">
          <summary className="min-h-11 cursor-pointer py-2 font-bold">Personalise your box</summary>
          <p className="text-sm">Digital preview only. Your box name and message stay in this browser and are not included with the order.</p>
          <label htmlFor="box-preview-name">Name your box (optional, {BOX_NAME_LIMIT} characters maximum)</label>
          <input id="box-preview-name" className="min-h-11 w-full rounded-control border border-ink bg-canvas p-2"
            value={boxName} maxLength={BOX_NAME_LIMIT} onChange={event => setBoxName(boxPreviewText(event.target.value, BOX_NAME_LIMIT))} />
          <label htmlFor="box-preview-message">Add a little message (optional, {BOX_MESSAGE_LIMIT} characters maximum)</label>
          <textarea id="box-preview-message" className="w-full rounded-control border border-ink bg-canvas p-2"
            value={giftMessage} maxLength={BOX_MESSAGE_LIMIT} onChange={event => setGiftMessage(boxPreviewText(event.target.value, BOX_MESSAGE_LIMIT))} />
          {giftMessage.trim() && <p className="experience-gift-card">{giftMessage}</p>}
        </details>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="secondary" disabled={remaining > 0} onClick={() => saveCombination()}>Save combination</Button>
          {savedBox && <>
            <Button type="button" variant="secondary" onClick={() => restoreCombination(savedBox)}>Restore saved combination</Button>
            <Button type="button" variant="quiet" onClick={() => saveCombination(true)}>Remove saved combination</Button>
          </>}
        </div>
        <p className="text-sm">{remaining ? `Choose ${remaining} more ${remaining === 1 ? 'cookie' : 'cookies'} to complete your box.` : 'Your box is ready to add to your basket.'}</p>
        <div className="flex flex-wrap gap-3">
          <Button type="button" disabled={remaining > 0 || pending} onClick={addToBasket}>Add box to basket</Button>
          <ButtonLink href="/clinics#basket" variant="secondary">Review basket</ButtonLink>
        </div>
        <p role="status" hidden={!feedback} className="text-sm font-semibold">{feedback}</p>
      </div>

      <dialog ref={dialog} aria-labelledby="box-picker-title"
        className="fixed inset-0 m-auto max-h-[85dvh] w-[calc(100%_-_2rem)] max-w-lg overflow-y-auto rounded-panel border-2 border-line bg-canvas p-4 text-ink shadow-xl backdrop:bg-ink/60 sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-2">
          <h2 id="box-picker-title" className="text-xl">{picker && !('slot' in picker) ? 'Replace your selection?' : 'Choose a cookie'}</h2>
          <Button type="button" variant="quiet" size="icon" aria-label="Close box dialog" onClick={() => dialog.current?.close()}>
            <span aria-hidden="true">×</span>
          </Button>
        </div>
        {picker && 'slot' in picker && (
          <ul className="grid gap-2">
            {products.map(cookie => {
              const image = cookie.image
              return (
                <li key={cookie.id}>
                  <Button type="button" variant="secondary" className="w-full justify-start gap-3 px-2 text-left whitespace-normal"
                    onClick={() => {
                      dialog.current?.close()
                      updateSlot(picker.slot, cookie.id)
                    }}>
                    {image && <Image src={image.src} alt="" width={48} height={48} className="size-12 shrink-0 rounded-control object-cover" />}
                    <span className="min-w-0 break-words">{cookie.name} · {formatOrderAmount(cookie.price)}</span>
                  </Button>
                </li>
              )
            })}
          </ul>
        )}
        {picker && !('slot' in picker) && (
          <>
            <p className="mb-4">Apply {'saved' in picker ? 'your saved combination' : picker.suggestion} and replace the cookies currently in your box?</p>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="secondary" onClick={() => dialog.current?.close()}>Keep my selection</Button>
              <Button type="button" onClick={() => {
                dialog.current?.close()
                update('saved' in picker ? picker.saved : [...BOX_SUGGESTIONS[picker.suggestion]])
              }}>Replace selection</Button>
            </div>
          </>
        )}
      </dialog>
    </section>
  )
}
