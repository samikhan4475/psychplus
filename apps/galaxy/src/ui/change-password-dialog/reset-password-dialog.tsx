import { PropsWithChildren } from 'react'
import { Dialog, Flex, Text } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components'
import { RestPasswordForm } from './reset-password-form'

const ResetPasswordDialog = ({ children }: PropsWithChildren) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content>
        <Flex>
          <Text size="5" weight="medium" mb="2">
            Change Password
          </Text>
          <CloseDialogTrigger />
        </Flex>
        <RestPasswordForm />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ResetPasswordDialog }
