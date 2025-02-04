'use client'

import { useState } from 'react'
import { Button } from '@radix-ui/themes'
import { PrinterIcon } from 'lucide-react'
import { handlePrint } from '@/utils'
import { PRINT_BUTTON_VISIT_VIEW } from './constants'
import { useQuickNotesPermissions } from './hooks'
import { PermissionAlert } from './permission-alert'

interface QuickNotesPrintButtonProps {
  id: string
}

const QuickNotesPrintButton = ({ id }: QuickNotesPrintButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [alertMessage, setAlertMessage] = useState<string>('')
  const { canPrintButtonVisitViewQuickNote } = useQuickNotesPermissions()
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
      <Button
        variant="outline"
        color="gray"
        size="1"
        className="text-black"
        onClick={() => {
          if (canPrintButtonVisitViewQuickNote)
            return handlePrint(id, 'Actual Note View')
          setIsOpen(true)
          setAlertMessage(PRINT_BUTTON_VISIT_VIEW)
        }}
      >
        <PrinterIcon height={14} width={14} strokeWidth={1.5} />
        Print
      </Button>
    </>
  )
}

export { QuickNotesPrintButton }
