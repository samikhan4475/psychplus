'use client'

import { CrossCircledIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { WarningIcon } from '@/components/icons'
import { useHasPermission } from '@/hooks'
import { useCosignDialog } from './hooks'
import { MarkErrorDialog } from './mark-error-dialog'
import { RemoveCosignDialog } from './remove-cosign-dialog'
import { useStore } from './store'
import { Tabs } from './types'

const NotesRemoveConsignerButton = () => {
  const { isOpen, closeDialog, openDialog } = useCosignDialog()

  const {
    selectedRow,
    setErrorMessage,
    setIsErrorAlertOpen,
    isInboxNotes,
    tab,
  } = useStore((state) => ({
    setErrorMessage: state.setErrorMessage,
    tab: state.tab,

    isInboxNotes: state.isInboxNotes,
    setIsErrorAlertOpen: state.setIsErrorAlertOpen,
    selectedRow: state.selectedRow,
  }))

  const removeCosignerButtonPermission = useHasPermission(
    'removeCosignerButtonNotesPage',
  )
  const handleClick = () => {
    if (!selectedRow) {
      setIsErrorAlertOpen(true)
      setErrorMessage('Please select note to click this button')
      return
    }

    if (!removeCosignerButtonPermission) {
      setIsErrorAlertOpen(true)
      setErrorMessage(
        'You do not have permission to Remove Cosigner. Please contact your supervisor if you need any further assistance.',
      )
      return
    }

    openDialog()
  }

  const dialogToShow =
    isInboxNotes && tab === Tabs.PENDING_NOTES ? (
      <MarkErrorDialog isOpen={isOpen} removecloseDialog={closeDialog} />
    ) : (
      <RemoveCosignDialog isOpen={isOpen} removecloseDialog={closeDialog} />
    )

  return (
    <>
      <Button
        variant="outline"
        color="gray"
        size="1"
        className="text-black"
        onClick={handleClick}
        disabled={selectedRow?.cosignedByUserId ? false : true}
      >
        {isInboxNotes ? (
          <CrossCircledIcon width={13} height={13} color="gray" />
        ) : (
          <WarningIcon width={16} height={16} />
        )}
        {isInboxNotes ? 'Reject' : 'Remove Cosigner'}
      </Button>
      {dialogToShow}
    </>
  )
}

export { NotesRemoveConsignerButton }
