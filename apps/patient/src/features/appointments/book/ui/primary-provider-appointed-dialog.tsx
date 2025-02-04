'use client'

import { Button, Dialog, Flex } from '@radix-ui/themes'
import { CloseDialogIcon } from '@/components-v2'
import { PrimaryProviderAppointedProps } from '@/features/appointments/book/types'
import { getNewProviderTypeLabel } from '@psychplus-v2/utils'

const PrimaryProviderAppointedDialog = ({
  open,
  setOpen,
  onSubmit,
  newProviderType
}: PrimaryProviderAppointedProps) => {
  const onChangePrimarycard = async () => {
    setOpen(false)
    onSubmit(true)
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(IsOpen) => {
        if (!IsOpen) {
          setOpen(false)
          onSubmit(true)
        }
      }}
    >
      <Dialog.Content className="relative max-w-[400px]">
        <CloseDialogIcon />
        <Flex justify="center" align="center" direction="column">
          <Dialog.Title className="font-sans -tracking-[0.25px]">
            Care Team
          </Dialog.Title>
          <Dialog.Description size="3" align="center">
            Selected Provider has been appointed as your <br />
            Primary {getNewProviderTypeLabel(newProviderType || '')}!
          </Dialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <Button className="bg-[#24366B]" onClick={onChangePrimarycard}>
              Done
            </Button>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { PrimaryProviderAppointedDialog }
