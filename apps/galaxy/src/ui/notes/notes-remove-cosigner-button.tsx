'use client'

import { Button } from '@radix-ui/themes'
import { WarningIcon } from '@/components/icons'
import { useStore } from './store'

const NotesRemoveConsignerButton = () => {
  const { selectedRows, setErrorMessage, setIsErrorAlertOpen } = useStore(
    (state) => ({
      setErrorMessage: state.setErrorMessage,
      setIsErrorAlertOpen: state.setIsErrorAlertOpen,
      selectedRows: state.selectedRows,
    }),
  )

  const handleClick = () => {
    if (!selectedRows.length) {
      setIsErrorAlertOpen(true)
      setErrorMessage('Please select one note to click this button')
    }
  }
  return (
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
  )
}

export { NotesRemoveConsignerButton }
