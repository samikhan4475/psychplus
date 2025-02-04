'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { CopyIcon } from 'lucide-react'
import { Appointment } from '@/types'
import { copyMyPreviousAction } from './actions'
import { CLEAR_BUTTON, COPY_MY_PREVIOUS_BUTTON } from './constants'
import { useQuickNotesPermissions } from './hooks'
import { PermissionAlert } from './permission-alert'
import { QuickNotesClearDialog } from './quicknotes-clear-dialog'

const QuickNotesClearButton = () => {
  const [isClearDialogOpen, setIsClearDialogOpen] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [alertMessage, setAlertMessage] = useState<string>('')
  const { canClearButtonQuickNotePage } = useQuickNotesPermissions()

  return (
    <>
      <PermissionAlert
        isOpen={isOpen}
        message={alertMessage}
        onClose={() => {
          setIsOpen(false)
          setAlertMessage('')
        }}
      />
      <QuickNotesClearDialog
        open={isClearDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsClearDialogOpen(false)
          }
        }}
      />
      <Button
        variant="outline"
        color="gray"
        size="1"
        className="text-black"
        onClick={() => {
          if (!canClearButtonQuickNotePage) {
            setIsOpen(true)
            setAlertMessage(CLEAR_BUTTON)
            return
          }
          setIsClearDialogOpen(true)
        }}
      >
        Clear
      </Button>
    </>
  )
}

export { QuickNotesClearButton }
