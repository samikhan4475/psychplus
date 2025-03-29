'use client'

import { Button } from '@radix-ui/themes'
import { WarningIcon } from '@/components/icons'
import { useHasPermission } from '@/hooks'
import { useStore as useGlobalStore } from '@/store'
import { useCosignDialog } from './hooks'
import { MarkErrorDialog } from './mark-error-dialog'
import { useStore } from './store'

const NotesMarkErrorButton = () => {
  const { staffId } = useGlobalStore((state) => state.user)

  const { isOpen, closeDialog, openDialog } = useCosignDialog()

  const {
    selectedRow,
    appointment,
    setErrorMessage,
    setIsErrorAlertOpen,
    isInboxNotes,
  } = useStore((state) => ({
    selectedRow: state.selectedRow,
    appointment: state.appointment,
    setErrorMessage: state.setErrorMessage,
    setIsErrorAlertOpen: state.setIsErrorAlertOpen,
    isInboxNotes: state.isInboxNotes,
  }))

  const markAsErrorNotProviderPermission = useHasPermission(
    'markAsErrorNotProviderNotesPage',
  )

  const markAsErrorProviderPermission = useHasPermission(
    'markAsErrorProviderNotesPage',
  )

  const handleClick = () => {
    if (!selectedRow) {
      setIsErrorAlertOpen(true)
      setErrorMessage('Please select note to click this button')
      return
    }
    const hasPermissionToMarkAsErrorProviderPermission =
      appointment?.providerStaffId === staffId && markAsErrorProviderPermission

    const hasPermissionToMarkAsErrorPermission =
      hasPermissionToMarkAsErrorProviderPermission
        ? true
        : !!markAsErrorNotProviderPermission

    if (!hasPermissionToMarkAsErrorPermission) {
      setIsErrorAlertOpen(true)
      setErrorMessage(
        'You do not have permission to Mark As Error Note. Please contact your supervisor if you need any further assistance.',
      )
      return
    }

    openDialog()
  }

  return (
    <>
      <Button
        variant="outline"
        color="gray"
        size="1"
        className="text-black"
        onClick={handleClick}
      >
        <WarningIcon width={16} height={16} />
        {isInboxNotes ? 'Reject' : 'Mark as Error'}
      </Button>
      {isOpen && (
        <MarkErrorDialog isOpen={isOpen} removecloseDialog={closeDialog} />
      )}
    </>
  )
}

export { NotesMarkErrorButton }
