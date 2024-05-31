'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Dialog, Flex, Text } from '@radix-ui/themes'
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
        <Button
          color="gray"
          variant="outline"
          className="absolute right-8 top-6 text-[#C62A2F] hover:bg-gray-2 active:bg-gray-3"
        >
          <Text weight="regular">Cancel</Text>
        </Button>
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
