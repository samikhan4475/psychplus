'use client'

import { Button } from '@radix-ui/themes'
import { WarningIcon } from '@/components/icons'
import { useStore } from '../store'

const RemoveConsignerButton = () => {
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

export { RemoveConsignerButton }
