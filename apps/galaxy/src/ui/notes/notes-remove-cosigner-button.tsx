'use client'

import { Button } from '@radix-ui/themes'
import { WarningIcon } from '@/components/icons'
import { useCosignDialog } from './hooks'
import { RemoveCosignDialog } from './remove-cosign-dialog'
import { useStore } from './store'

const NotesRemoveConsignerButton = () => {
  const { isOpen, closeDialog, openDialog } = useCosignDialog()

  const { selectedRow, setErrorMessage, setIsErrorAlertOpen } = useStore(
    (state) => ({
      setErrorMessage: state.setErrorMessage,
      setIsErrorAlertOpen: state.setIsErrorAlertOpen,
      selectedRow: state.selectedRow,
    }),
  )

  const handleClick = () => {
    if (!selectedRow) {
      setIsErrorAlertOpen(true)
      setErrorMessage('Please select note to click this button')
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
        Remove Cosigner
      </Button>
      <RemoveCosignDialog isOpen={isOpen} removecloseDialog={closeDialog} />
    </>
  )
}

export { NotesRemoveConsignerButton }
