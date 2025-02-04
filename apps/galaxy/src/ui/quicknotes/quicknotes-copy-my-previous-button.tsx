'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { CopyIcon } from 'lucide-react'
import { Appointment } from '@/types'
import { copyMyPreviousAction } from './actions'
import { COPY_MY_PREVIOUS_BUTTON } from './constants'
import { useQuickNotesPermissions } from './hooks'
import { PermissionAlert } from './permission-alert'

interface QuickNotesCopyPreviousButtonProps {
  appointment: Appointment
}
const QuickNotesCopyMyPreviousButton = ({
  appointment,
}: QuickNotesCopyPreviousButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [alertMessage, setAlertMessage] = useState<string>('')
  const { canCopyMyPreviousButtonQuickNotePage } = useQuickNotesPermissions()
  const { isNoteSignedByProviderInLastYear } = appointment

  const router = useRouter()

  const handleCopyMyPrevious = () => {
    copyMyPreviousAction().then(() => router.refresh())
  }

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
        disabled={!isNoteSignedByProviderInLastYear}
        className={`${
          !isNoteSignedByProviderInLastYear
            ? 'bg-[#ebebef] text-[#0005119e]'
            : 'text-black'
        }`}
        onClick={() => {
          if (canCopyMyPreviousButtonQuickNotePage)
            return handleCopyMyPrevious()
          setIsOpen(true)
          setAlertMessage(COPY_MY_PREVIOUS_BUTTON)
        }}
      >
        <CopyIcon height={14} width={14} strokeWidth={1.5} />
        Copy My Previous
      </Button>
    </>
  )
}

export { QuickNotesCopyMyPreviousButton }
