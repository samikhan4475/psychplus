'use client'

import { useState } from 'react'

const useDeleteConfirmDialog = () => {
  const [isDeleteConfirmDialogOpen, setIsDeleteConfirmDialogOpen] =
    useState(false)

  const toggleDeleteConfirmDialog = () => {
    setIsDeleteConfirmDialogOpen((prevState) => !prevState)
  }

  return {
    isDeleteConfirmDialogOpen,
    toggleDeleteConfirmDialog,
  }
}

export { useDeleteConfirmDialog }
