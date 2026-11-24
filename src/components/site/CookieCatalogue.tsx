'use client'

// Hands the cookies from the database to every browser component that shows or prices a cookie.
// The site layout reads them on the server (src/lib/cookie-catalogue.ts) and puts them in this
// provider, so the order form, the basket, the comparison and the box builder all show the same
// names and prices that the order action will charge.
import { createContext, useContext, type ReactNode } from 'react'
import { COOKIES, type CookieProduct } from '@/content/cookies'

const CookieCatalogueContext = createContext<readonly CookieProduct[]>(COOKIES)

export function CookieCatalogueProvider({ cookies, children }: { cookies: readonly CookieProduct[]; children: ReactNode }) {
  return <CookieCatalogueContext.Provider value={cookies}>{children}</CookieCatalogueContext.Provider>
}

/** The cookies, in catalogue order, as the database holds them. */
export function useCookies(): readonly CookieProduct[] {
  return useContext(CookieCatalogueContext)
}
