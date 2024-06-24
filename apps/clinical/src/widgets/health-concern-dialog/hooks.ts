'use client'

import { useState } from 'react'

const useHealthConcernDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const toggleDialog = () => {
    setIsDialogOpen((prevState) => !prevState)
  }

  return {
    isDialogOpen,
    toggleDialog,
  }
}

export { useHealthConcernDialog }
