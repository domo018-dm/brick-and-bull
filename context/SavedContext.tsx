'use client'

import { createContext, useContext, useState, useCallback } from 'react'

interface SavedContextValue {
  saved: Set<string>
  toggle: (id: string) => void
}

const SavedContext = createContext<SavedContextValue>({
  saved: new Set(),
  toggle: () => {},
})

export function SavedProvider({ children }: { children: React.ReactNode }) {
  const [saved, setSaved] = useState<Set<string>>(new Set())

  const toggle = useCallback((id: string) => {
    setSaved(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  return (
    <SavedContext.Provider value={{ saved, toggle }}>
      {children}
    </SavedContext.Provider>
  )
}

export function useSaved() {
  return useContext(SavedContext)
}
