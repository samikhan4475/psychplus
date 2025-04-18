import { Cross1Icon } from '@radix-ui/react-icons'
import { AlertDialog, Flex, Text } from '@radix-ui/themes'

interface ProfilePreferenceAlertProps {
  open: boolean
  onClose: () => void
}

const ProfilePreferenceAlert = ({
  open,
  onClose,
}: ProfilePreferenceAlertProps) => {
  return (
    <AlertDialog.Root
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          onClose()
        }
      }}
    >
      <AlertDialog.Content>
        <Flex align="start" justify="between">
          <Text weight="medium" className="w-5/6">
            Please ensure Profile Preferences status is “approved” for this
            provider in order to proceed
          </Text>
          <AlertDialog.Cancel
            className="min-w-5 min-h-5 ml-auto cursor-pointer"
            onClick={onClose}
          >
            <Cross1Icon strokeWidth={1.5} className="text-pp-icon-sub" />
          </AlertDialog.Cancel>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export { ProfilePreferenceAlert }
