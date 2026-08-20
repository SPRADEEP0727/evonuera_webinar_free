import { createContext, useContext, useState, useEffect, useCallback, lazy, Suspense } from 'react'

const loadModal = () => import('./ReserveModal.jsx')
const ReserveModal = lazy(loadModal)

const ReserveContext = createContext({
  open: () => {},
  close: () => {},
  isOpen: false,
  registered: false,
  markRegistered: () => {},
})

export const useReserve = () => useContext(ReserveContext)

const REGISTERED_KEY = 'evonuera_registered'

export function ReserveProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [registered, setRegistered] = useState(false)
  // Stays true after the first open so exit animations still have a tree to
  // animate out of, and the chunk is only ever fetched once.
  const [modalMounted, setModalMounted] = useState(false)

  // Restore "registered" state so the webinar stays unlocked across reloads.
  useEffect(() => {
    try {
      if (localStorage.getItem(REGISTERED_KEY) === '1') setRegistered(true)
    } catch {
      /* storage unavailable - ignore */
    }
  }, [])

  const open = useCallback(() => {
    setModalMounted(true)
    setIsOpen(true)
  }, [])
  const close = useCallback(() => setIsOpen(false), [])

  const markRegistered = useCallback(() => {
    setRegistered(true)
    try {
      localStorage.setItem(REGISTERED_KEY, '1')
    } catch {
      /* storage unavailable - ignore */
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(loadModal, { timeout: 4000 })
      return () => window.cancelIdleCallback(id)
    }
    const t = setTimeout(loadModal, 2500)
    return () => clearTimeout(t)
  }, [])

  // Esc to close + lock body scroll while open
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => e.key === 'Escape' && close()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [isOpen, close])

  return (
    <ReserveContext.Provider value={{ open, close, isOpen, registered, markRegistered }}>
      {children}

      {modalMounted && (
        <Suspense fallback={null}>
          <ReserveModal isOpen={isOpen} close={close} />
        </Suspense>
      )}
    </ReserveContext.Provider>
  )
}
