'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex, IconButton } from '@radix-ui/themes'
import { CloseDialogIcon, FormError } from '@/components-v2'
import { useToast } from '@/providers'
import { cancelAppointment } from '../actions'

interface CancelAppointmentParams {
  appointmentId: number
}

const CancelAppointment = ({ appointmentId }: CancelAppointmentParams) => {
  const [error, setError] = useState<string>()
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onCancel = async () => {
    setError(undefined)
    setLoading(true)

    const result = await cancelAppointment(appointmentId)

    if (result.state === 'error') {
      setError(result.error)
      setLoading(false)
      return
    }

    toast({
      type: 'success',
      title: 'Appointment Cancelled',
    })

    setOpen(false)
    setLoading(false)

    router.refresh()
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <IconButton
          color="gray"
          variant="ghost"
          className="absolute right-4 top-4 h-[30px] w-[30px] transition-colors hover:bg-gray-2 active:bg-gray-3"
        >
          <Cross1Icon width={20} height={20} />
          <span className="sr-only">Cancel appointment button</span>
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Content className="relative">
        <CloseDialogIcon />
        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Cancel Appointment
        </Dialog.Title>
        <FormError message={error} />
        <Dialog.Description size="3" className="text-slate-11">
          Are you sure you want to cancel this appointment?
        </Dialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="outline" color="gray" highContrast>
              No, keep appointment
            </Button>
          </Dialog.Close>
          <Button
            color="tomato"
            type="submit"
            disabled={loading}
            onClick={onCancel}
          >
            Yes, cancel appointment
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { CancelAppointment }
