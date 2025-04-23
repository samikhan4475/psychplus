import { Cross1Icon } from '@radix-ui/react-icons'
import { AlertDialog, Box, Flex } from '@radix-ui/themes'
import { TriangleAlert } from 'lucide-react'

interface PermissionAlertProps {
  isOpen: boolean
  message: string
  onClose: () => void
  showHeading?: boolean
}

const PermissionAlert = ({
  message,
  isOpen,
  onClose,
  showHeading = true,
}: PermissionAlertProps) => {
  return (
    <AlertDialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose()
        }
      }}
    >
      <AlertDialog.Content className="bg-pp-warning-bg-1 border-pp-warning-border w-full border">
        <Flex gap="3">
          <TriangleAlert className="min-w-6 min-h-6 text-pp-warning-border" />
          <Flex direction="column">
            {showHeading ? (
              <AlertDialog.Title className="pt-1">Error</AlertDialog.Title>
            ) : null}
            <AlertDialog.Description size="4">
              {message}
            </AlertDialog.Description>
          </Flex>
          <Box className="flex-1">
            <AlertDialog.Cancel
              className="min-w-5 min-h-5 ml-auto cursor-pointer"
              onClick={onClose}
            >
              <Cross1Icon strokeWidth={1.5} className="text-pp-icon-sub" />
            </AlertDialog.Cancel>
          </Box>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export { PermissionAlert }
