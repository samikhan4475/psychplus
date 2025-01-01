import { Cross1Icon } from '@radix-ui/react-icons'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import { TriangleAlert } from 'lucide-react'

const NoteSignedAlert = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: (isConfirmed: boolean) => () => void
}) => {
  return (
    <AlertDialog.Root open={isOpen}>
      <AlertDialog.Content className="bg-pp-warning-bg-1 border-pp-warning-border border">
        <Flex gap="3">
          <TriangleAlert className="min-w-6 min-h-6 text-pp-warning-border" />
          <Flex direction="column" gap="3">
            <AlertDialog.Description size="4">
              You have a signed note for this visit, by changing the visit type
              you will need a new note, and your previous note will be marked as
              error
            </AlertDialog.Description>
            <Flex gap="2">
              <AlertDialog.Action
                className="bg-pp-blue-400 flex-1"
                onClick={onClose(true)}
              >
                <Button>Proceed</Button>
              </AlertDialog.Action>
              <AlertDialog.Cancel onClick={onClose(false)} className="flex-1">
                <Button variant="surface" color="gray" highContrast>
                  No
                </Button>
              </AlertDialog.Cancel>
            </Flex>
          </Flex>
          <AlertDialog.Cancel
            className="min-w-5 min-h-5 cursor-pointer"
            onClick={onClose(false)}
          >
            <Cross1Icon strokeWidth={1.5} className="text-pp-icon-sub" />
          </AlertDialog.Cancel>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export { NoteSignedAlert }
