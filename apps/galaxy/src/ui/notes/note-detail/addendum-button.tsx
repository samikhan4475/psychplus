'use client'

import { PlusIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { useStore } from '../store'

interface AddendumButtonProps {
  onClick: () => void
}
const AddendumButton = ({ onClick }: AddendumButtonProps) => {
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

    onClick()
  }

  return (
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
  )
}

export { AddendumButton }
