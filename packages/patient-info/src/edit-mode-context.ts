'use client'

import { createContext, useContext } from 'react'

interface ContextType {
  editable: boolean
}

const EditModeContext = createContext<ContextType | undefined>(undefined)

const useEditModeContext = (): ContextType => {
  const context = useContext(EditModeContext)
  if (!context) {
    throw Error('useContext must be called inside a provider')
  }
  return context
}

export { EditModeContext, useEditModeContext }
