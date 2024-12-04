'use client'

import { Button } from '@radix-ui/themes'
import { WarningIcon } from '@/components/icons'
import { useCosignDialog } from './hooks'
import { MarkErrorDialog } from './mark-error-dialog'
import { useStore } from './store'

const NotesMarkErrorButton = () => {
  const { isOpen, closeDialog, openDialog } = useCosignDialog()

  const { selectedRow, setErrorMessage, setIsErrorAlertOpen } = useStore(
    (state) => ({
      selectedRow: state.selectedRow,
      setErrorMessage: state.setErrorMessage,
      setIsErrorAlertOpen: state.setIsErrorAlertOpen,
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
        Mark as Error
      </Button>
      {isOpen && (
        <MarkErrorDialog isOpen={isOpen} removecloseDialog={closeDialog} />
      )}
    </>
  )
}

export { NotesMarkErrorButton }
