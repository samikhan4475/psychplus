import { useState } from 'react'
import { Cross1Icon } from '@radix-ui/react-icons'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import { TriangleAlert } from 'lucide-react'
import { StatusCode } from '../constants'
import { UpdateVisitAlertProps } from '../types'

const UpdateVisitAlert = ({ state, onConfirm }: UpdateVisitAlertProps) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const isConfirmationCode =
    state.status === StatusCode.OverridePermission ||
    state.status === StatusCode.ProceedConfirmation

  const messages = state.message.includes('\n')
    ? state.message.split('\n').filter((s) => s)
    : [state.message]

  const handleConfirm = (isConfirm: boolean) => {
    if (isConfirm && currentMessageIndex < messages.length - 1) {
      return setCurrentMessageIndex(currentMessageIndex + 1)
    } else if (isConfirm) {
      onConfirm(true, state.status)
    } else if (!isConfirm) {
      onConfirm(false)
    }
    setCurrentMessageIndex(0)
  }

  return (
    <AlertDialog.Root open={state.open}>
      <AlertDialog.Content className="bg-pp-warning-bg-1 border-pp-warning-border flex-col border p-3">
        <Flex justify="end">
          <AlertDialog.Cancel
            className="min-w-5 min-h-5 cursor-pointer"
            onClick={() => onConfirm(false)}
          >
            <Cross1Icon strokeWidth={1.5} className="text-pp-icon-sub" />
          </AlertDialog.Cancel>
        </Flex>
        <Flex gap="3">
          <TriangleAlert className="min-w-6 min-h-6 text-pp-warning-border" />
          <Flex direction="column">
            <AlertDialog.Description size="4">
              {messages[currentMessageIndex]}
            </AlertDialog.Description>
          </Flex>
        </Flex>
        {isConfirmationCode && (
          <Flex gap="2" justify="end">
            <Button
              className="bg-pp-link-text text-white w-[166px] cursor-pointer"
              onClick={() => handleConfirm(true)}
            >
              Yes
            </Button>
            <Button
              className="border-pp-gray-2 text-pp-black-3 bg-white w-[166px] cursor-pointer"
              onClick={() => handleConfirm(false)}
            >
              No
            </Button>
          </Flex>
        )}
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export { UpdateVisitAlert }
