'use client'

import { CODESETS } from '@psychplus-v2/constants'
import { Button, Dialog, Flex } from '@radix-ui/themes'
import { CloseDialogIcon } from '@/components-v2'
import { useCodesetCodes } from '@/providers'
import { DifferentStateDialogProps } from '../../types'

const DifferentStateDialog = ({
  open,
  setOpen,
  onClose,
  myState,
  providerState,
  onConfirm,
}: DifferentStateDialogProps) => {
  const stateCodeMap = useCodesetCodes(CODESETS.UsStates).reduce(
    (acc, code) => {
      acc[code.value] = code.display
      return acc
    },
    {} as Record<string, string>,
  )

  const clinic =
    providerState &&
    JSON.parse(new URLSearchParams(providerState).get('clinic') || '{}')

  const clinicState = clinic?.contact?.addresses?.[0]?.state
  const stateLabels = {
    provider: stateCodeMap[clinicState] || 'Unknown',
    user: stateCodeMap[myState] || 'Unknown',
  }

  const handleClose = (confirmed = false) => {
    setOpen(false)
    onClose(!confirmed)
    if (confirmed && onConfirm) onConfirm()
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(isOpen) => !isOpen && handleClose()}
    >
      <Dialog.Content className="relative">
        <CloseDialogIcon />
        <Dialog.Title className="font-sans capitalize -tracking-[0.25px]">
          Verify your location before booking
        </Dialog.Title>
        <Dialog.Description size="3">
          You&apos;re about to book an appointment with the provider in &quot;
          {stateLabels.provider}&quot;, but your primary address is in &quot;
          {stateLabels.user}&quot;. Are you currently in the state where you are
          booking the appointment?
        </Dialog.Description>
        <Flex gap="3" mt="4">
          <Button
            variant="outline"
            color="gray"
            className="w-6/12 py-2 capitalize"
            highContrast
            onClick={() => handleClose()}
          >
            No, cancel appointment
          </Button>

          <Dialog.Close>
            <Button
              className="w-6/12 bg-[#24366B] py-2 capitalize"
              onClick={() => handleClose(true)}
            >
              Yes, book appointment
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { DifferentStateDialog }
