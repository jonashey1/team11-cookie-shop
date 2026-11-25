'use client'

import Link from 'next/link'
import { useLayoutEffect, useRef, useState, type FormEvent } from 'react'
import { submitWorkshopRegistration } from '@/app/(site)/workshops/registration-action'
import { formatWorkshopSession, MAX_WORKSHOP_PARTICIPANTS, type WorkshopConfirmation, type WorkshopSessionChoice } from '@/lib/workshop-registration'
import { Button } from '@/components/ui/button'

const notice = 'This is a fictional university demonstration. Use fictional contact details only. No real reservation, payment or email confirmation is made.'
const fieldClass = 'min-h-11 w-full rounded-control border border-line bg-canvas px-3 py-2 text-ink'
const available = (session: WorkshopSessionChoice) => session.status === 'open' && session.remaining > 0

export function WorkshopRegistrationForm({ workshop, title, initialSessions }: {
  workshop: number
  title: string
  initialSessions: WorkshopSessionChoice[]
}) {
  const [sessions, setSessions] = useState(initialSessions)
  const [sessionId, setSessionId] = useState('')
  const [participants, setParticipants] = useState(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [review, setReview] = useState(false)
  const [confirmation, setConfirmation] = useState<WorkshopConfirmation>()
  const [error, setError] = useState('')
  const [used, setUsed] = useState(false)
  const [pending, setPending] = useState(false)
  const [focusRequest, setFocusRequest] = useState(0)
  const busy = useRef(false)
  const requestId = useRef('')
  const requestKey = `cookie-shop:workshop-request:${workshop}`
  const heading = useRef<HTMLHeadingElement>(null)
  const session = sessions.find(item => String(item.id) === sessionId && available(item))
  const maximum = session ? Math.min(MAX_WORKSHOP_PARTICIPANTS, session.remaining) : 1

  // Move focus before the new controls are painted, so a fast Tab or Enter is not interrupted.
  useLayoutEffect(() => {
    if (focusRequest) heading.current?.focus()
  }, [focusRequest])

  const focusHeading = () => setFocusRequest(request => request + 1)

  function startAgain() {
    requestId.current = ''
    try { sessionStorage.removeItem(requestKey) } catch {
      // The page can still start a new registration without storage.
    }
    setUsed(false)
    setError('')
    setConfirmation(undefined)
    setReview(false)
    setSessionId('')
    setParticipants(1)
    setName('')
    setEmail('')
    focusHeading()
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!session || busy.current) return
    setError('')
    if (!review) {
      setReview(true)
      focusHeading()
      return
    }
    busy.current = true
    setPending(true)
    try {
      if (!requestId.current) {
        requestId.current = crypto.randomUUID()
        try {
          requestId.current = sessionStorage.getItem(requestKey) || requestId.current
          sessionStorage.setItem(requestKey, requestId.current)
        } catch {
          // The in-memory token still protects retries on this page.
        }
      }
      const form = new FormData()
      for (const [key, value] of Object.entries({ workshop, session: session.id, participants, name, email, requestId: requestId.current })) {
        form.set(key, String(value))
      }
      const result = await submitWorkshopRegistration(form)
      if (result.confirmation) {
        setConfirmation(result.confirmation)
        focusHeading()
      } else {
        setError(result.error)
        setUsed(Boolean(result.used))
        if (result.sessions) {
          setSessions(result.sessions)
          setSessionId('')
          setParticipants(1)
        }
        setReview(false)
        focusHeading()
      }
    } catch {
      setError('The connection was interrupted. Try again with the same details.')
    } finally {
      busy.current = false
      setPending(false)
    }
  }

  return (
    <section id="workshop-registration" aria-labelledby="registration-heading" className="mt-block grid min-w-0 scroll-mt-24 gap-stack rounded-panel border border-line bg-yellow-wash p-stack sm:p-block">
      <h2 ref={heading} tabIndex={-1} id="registration-heading" className="text-3xl">
        {confirmation ? 'You’re on the demo list!' : review ? 'Review your registration' : 'Reserve your spot'}
      </h2>
      <p className="max-w-reading text-ink-soft">{notice} <Link href="/privacy" className="underline">Privacy information</Link></p>
      {error && <p role="alert" className="rounded-control border border-line bg-canvas p-3 font-semibold">{error}</p>}
      {used && <Button type="button" variant="secondary" className="w-fit" onClick={startAgain}>Start a new registration</Button>}
      {confirmation ? (
        <div role="status" className="grid gap-stack">
          <p className="font-bold [overflow-wrap:anywhere]">Registration reference {confirmation.reference}</p>
          <p>{confirmation.workshopTitle} · {confirmation.sessionTitle}</p>
          <p>{formatWorkshopSession(confirmation.startsAt, confirmation.endsAt)} · {confirmation.participants} participant(s)</p>
          <Link href="/workshops" className="w-fit underline">Explore all workshops</Link>
        </div>
      ) : (
        <form onSubmit={submit} hidden={used} className={used ? 'hidden' : 'grid min-w-0 gap-stack'}>
          {review && session ? (
            <>
              <dl className="grid gap-2 rounded-control border border-line bg-canvas p-4">
                <div><dt className="font-bold">Workshop</dt><dd>{title}</dd></div>
                <div><dt className="font-bold">Session</dt><dd>{session.title} · {formatWorkshopSession(session.startsAt, session.endsAt)}</dd></div>
                <div><dt className="font-bold">Participants</dt><dd>{participants}</dd></div>
                <div><dt className="font-bold">Fictional contact</dt><dd className="[overflow-wrap:anywhere]">{name} · {email}</dd></div>
              </dl>
              <div className="flex flex-wrap gap-3">
                <Button type="submit" disabled={pending} className="max-w-full whitespace-normal">{pending ? 'Confirming…' : 'Confirm demo registration'}</Button>
                <Button type="button" variant="secondary" disabled={pending} onClick={() => { setReview(false); focusHeading() }}>Edit details</Button>
              </div>
            </>
          ) : (
            <>
              <fieldset className="grid min-w-0 gap-3">
                <legend className="mb-2 font-bold">Choose a session</legend>
                {sessions.length === 0 && <p>No upcoming sessions.</p>}
                {sessions.map(item => (
                  <label key={item.id} className="flex min-w-0 items-start gap-3 rounded-control border border-line bg-canvas p-3">
                    <input type="radio" name="session" value={item.id} disabled={!available(item)} required
                      checked={sessionId === String(item.id)} onChange={() => { setSessionId(String(item.id)); setParticipants(1) }} className="mt-1" />
                    <span className="grid min-w-0 gap-1">
                      <strong className="[overflow-wrap:anywhere]">{item.title}</strong>
                      <span>{formatWorkshopSession(item.startsAt, item.endsAt)}</span>
                      <span className="text-ink-soft">{item.status === 'cancelled' ? 'Cancelled' : item.status === 'closed' ? 'Registration closed' : item.remaining === 0 ? 'Fully booked' : `${item.remaining} places available`}</span>
                    </span>
                  </label>
                ))}
              </fieldset>
              {sessions.some(available) && (
                <>
                  <div className="grid min-w-0 gap-stack md:grid-cols-2">
                    <label className="grid min-w-0 gap-2 font-semibold">Number of participants
                      <select className={fieldClass} disabled={!session} value={participants} onChange={event => setParticipants(Number(event.target.value))}>
                        {Array.from({ length: maximum }, (_, index) => <option key={index + 1}>{index + 1}</option>)}
                      </select>
                    </label>
                    <label className="grid min-w-0 gap-2 font-semibold">Fictional full name
                      <input className={fieldClass} required minLength={2} maxLength={100} value={name} onChange={event => setName(event.target.value)} />
                    </label>
                    <label className="grid min-w-0 gap-2 font-semibold">Fictional email
                      <input className={fieldClass} type="email" required maxLength={254} pattern="[^\s@]+@[^\s@]+[.]example"
                        placeholder="name@cookieshop.example" value={email} onChange={event => setEmail(event.target.value)} />
                    </label>
                  </div>
                  <Button type="submit" disabled={!session} className="w-fit max-w-full whitespace-normal">Review registration</Button>
                </>
              )}
            </>
          )}
        </form>
      )}
    </section>
  )
}
