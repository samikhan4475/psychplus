'use client'

import { createContext, useContext } from 'react'

interface ToggleableFormContextType {
  open: boolean
  setOpen: (open: boolean) => void
  error?: string
  setError: (error: string | undefined) => void
  disabled?: boolean
  hasTrigger?: boolean
  onFormClose?: () => void
  isEdit?: boolean
  allowExternalSave?: boolean
}

const ToggleableFormContext = createContext<
  ToggleableFormContextType | undefined
>(undefined)

const useToggleableFormContext = () => {
  const context = useContext(ToggleableFormContext)

  if (!context) {
    throw new Error(
      'ToggleableFormContext not found; did you forget to use ToggleableFormContext.Provider?',
    )
  }

  return context
}

export { useToggleableFormContext, ToggleableFormContext }
