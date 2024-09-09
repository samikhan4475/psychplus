'use client'

import { useCallback, useState } from 'react'

function useCosignDialog(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState)

  const openDialog = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeDialog = useCallback(() => {
    setIsOpen(false)
  }, [])

  const toggleDialog = useCallback(() => {
    setIsOpen((prevState) => !prevState)
  }, [])

  return {
    isOpen,
    openDialog,
    closeDialog,
    toggleDialog,
  }
}

export  {useCosignDialog}
