'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { Dialog } from '@radix-ui/themes'
import { ConfirmationAlertDialogContent } from '../alerts'
import { useStore } from './quicknotes-store'

const QuickNotesMarkAsError = () => {
  const {
    isMarkedAsError,
    closeMarkErrorModal,
    markAsError,
    errorMessage,
    loading,
  } = useStore((state) => ({
    isMarkedAsError: state.isMarkedAsError,
    closeMarkErrorModal: state.closeMarkErrorModal,
    markAsError: state.markAsError,
    errorMessage: state.errorMessage,
    loading: state.loading,
  }))

  const patientId = useParams().id as string
  const appointmentId = useSearchParams().get('id') as string

  return (
    <Dialog.Root
      open={isMarkedAsError}
      onOpenChange={(dialogNewState) => {
        if (!dialogNewState && isMarkedAsError) {
          closeMarkErrorModal(!isMarkedAsError)
        }
      }}
    >
      <ConfirmationAlertDialogContent
        title="Mark Note as Error"
        loadingTitle="Marking Note as Error"
        onProceed={() => markAsError({ patientId, appointmentId })}
        loading={loading}
        message={errorMessage}
      />
    </Dialog.Root>
  )
}

export { QuickNotesMarkAsError }
