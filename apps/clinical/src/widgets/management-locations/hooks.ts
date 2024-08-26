'use client'

import { useState } from 'react'

const useLocationstDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const toggleDialog = () => {
    setIsDialogOpen((prevState) => !prevState)
  }

  return {
    isDialogOpen,
    toggleDialog,
  }
}

export { useLocationstDialog }
