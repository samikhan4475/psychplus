'use client'

import { Button, Dialog, Flex } from '@radix-ui/themes'
import { CloseDialogIcon } from '@/components-v2'
import { useStore } from '@/features/appointments/search/store'
import { insuranceMayNotCoverMessage } from '../utils'

interface InsuranceNotCoverProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const InsuranceNotCoverDialog = ({ open, setOpen }: InsuranceNotCoverProps) => {
  const currentBookingData = useStore(
    (state) => state.currentBookingAppointmentData,
  )
  if (!currentBookingData) return

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(IsOpen) => {
        if (!IsOpen) {
          setOpen(false)
        }
      }}
    >
      <Dialog.Content className="relative">
        <CloseDialogIcon />
        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Insurance may not cover
        </Dialog.Title>
        <Dialog.Description size="3">
          {insuranceMayNotCoverMessage(currentBookingData.appointmentType)}
        </Dialog.Description>
        <Flex mt="4" justify="end">
          <Dialog.Close>
            <Button highContrast size="3" className="px-4">
              Ok
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { InsuranceNotCoverDialog }
