'use client'

import { WarningAlertDialog } from '@/ui/alerts'

const AlertDialog = ({
  isOpen,
  setIsOpen,
  message,
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  message?: string
}) => {
  return (
    <WarningAlertDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      message={message}
      setMessage={() => setIsOpen(false)}
    />
  )
}

export { AlertDialog }
