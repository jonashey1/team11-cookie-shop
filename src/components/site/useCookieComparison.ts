'use client'

import { useSyncExternalStore } from 'react'
import { normalizeComparison, removeCookie, selectCookie, type CookieId } from '@/lib/cookie-comparison'

const EMPTY: readonly CookieId[] = []
const KEY = 'cookie-shop-comparison'
const listeners = new Set<() => void>()
let selection: readonly CookieId[] | undefined
let message = ''
let snapshot = { ids: EMPTY, message }

function getComparison() {
  if (!selection) {
    try {
      selection = normalizeComparison(JSON.parse(sessionStorage.getItem(KEY) ?? 'null'))
    } catch {
      selection = EMPTY
    }
    snapshot = { ids: selection, message }
  }
  return snapshot
}

const serverSnapshot = snapshot

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => { listeners.delete(listener) }
}

function save(ids: readonly CookieId[], feedback: string) {
  selection = ids
  message = feedback
  snapshot = { ids, message }
  try {
    if (ids.length) sessionStorage.setItem(KEY, JSON.stringify(ids))
    else sessionStorage.removeItem(KEY)
  } catch {
    // Keep the selection for this navigation session if storage is blocked.
  }
  listeners.forEach(listener => listener())
}

export function addToComparison(id: CookieId, name: string) {
  const { ids, status } = selectCookie(getComparison().ids, id)
  const feedback = status === 'full'
    ? 'You can compare up to three cookies. Remove one to add another.'
    : status === 'already-selected'
      ? `${name} is already in your comparison.`
      : `${name} added to your comparison. ${ids.length} of 3 selected.`
  save(ids, feedback)
}

export function removeFromComparison(id: CookieId, name: string) {
  const ids = removeCookie(getComparison().ids, id)
  save(ids, `${name} removed from your comparison. ${ids.length} of 3 selected.`)
}

export function clearComparison() {
  save(EMPTY, 'Comparison cleared.')
}

export function useCookieComparison() {
  return useSyncExternalStore(subscribe, getComparison, () => serverSnapshot)
}