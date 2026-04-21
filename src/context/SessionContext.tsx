import { createContext, useContext, useReducer } from 'react'
import type { ReactNode } from 'react'
import { sessionReducer, initialState } from './sessionReducer'
import type { SessionState } from '../types/index'
import type { SessionAction } from './sessionReducer'

interface SessionContextType {
  state: SessionState
  dispatch: (action: SessionAction) => void
}

const SessionContext = createContext<SessionContextType | null>(null)

export function SessionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(sessionReducer, initialState)
  return (<SessionContext.Provider value={{ state, dispatch }}>{children}</SessionContext.Provider>)
}

export function useSession() {
  const context = useContext(SessionContext)
  if (!context) throw new Error('useSession musi być użyty z SessionProvider')
  return context
}
