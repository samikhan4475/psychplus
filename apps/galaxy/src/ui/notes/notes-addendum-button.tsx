'use client'

import { PlusIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { AddendumDialog } from './addendum-dialog'
import { useCosignDialog } from './hooks'
import { useStore } from './store'

const NotesAddendumButton = () => {
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
      setErrorMessage('Please select one note to click this button')
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
        <PlusIcon className="text-pp-gray-3" width={16} height={16} />
        Addendum
      </Button>
      {isOpen && <AddendumDialog isOpen={isOpen} closeDialog={closeDialog} />}
    </>
  )
}

export { NotesAddendumButton }
