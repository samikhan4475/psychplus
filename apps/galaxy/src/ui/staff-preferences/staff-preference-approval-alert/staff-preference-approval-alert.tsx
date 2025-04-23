'use client'

import { Box, Button, Dialog, Text } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { usePreferenceApprovalAlert } from './hook'

interface PreferenceApprovalAlertProps {
  isInitialLogin: boolean
}

const PreferencesApprovalAlert = ({
  isInitialLogin,
}: PreferenceApprovalAlertProps) => {
  const { isOpen, setIsOpen, approvePreferences } =
    usePreferenceApprovalAlert(isInitialLogin)

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <Dialog.Content className="relative max-w-[700px]">
        <CloseDialogTrigger />

        <Dialog.Title className="-tracking-[0.25px]">
          <Text className="mt-2 font-medium">
            Your visit preferences have been updated, do you approve those
            preference (Profile{'>'}Preferences)
          </Text>
        </Dialog.Title>
        <Box className="mb-2 "></Box>
        <Box className="mb-2 flex items-end justify-end gap-2">
          <Button
            className={
              'bg-white text-pp-black-3 active:bg-pp-focus-bg active:text-pp-blue border-pp-black-3'
            }
            color="gray"
            variant="outline"
            onClick={() => setIsOpen(false)}
          >
            <Text size="1">Cancel</Text>
          </Button>
          <Button
            className={'bg-pp-black-1 text-white'}
            color="gray"
            variant="outline"
            type="button"
            onClick={approvePreferences}
          >
            <Text size="1">Yes</Text>
          </Button>
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { PreferencesApprovalAlert }
