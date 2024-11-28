'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AppointmentType } from '@psychplus-v2/constants'
import { Appointment } from '@psychplus-v2/types'
import { Button, Dialog, Flex, Text } from '@radix-ui/themes'
import { CloseDialogIcon, FormError } from '@/components-v2'
import { useToast } from '@/providers'
import { rescheduleAppointment } from '../actions'

interface ChangeVisitMediumProp {
  appointment: Appointment
}

const ChangeVisitMedium = ({ appointment }: ChangeVisitMediumProp) => {
  const [error, setError] = useState<string>()
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onConfirmation = async () => {
    setError(undefined)
    setLoading(true)

    const result = await rescheduleAppointment({
      appointmentId: appointment.id,
      specialistStaffId: appointment.specialist.id,
      specialistTypeCode: appointment.specialistTypeCode,
      type:
        appointment.type === AppointmentType.InPerson
          ? AppointmentType.Virtual
          : AppointmentType.InPerson,
      startDate: appointment.startDate,
      duration: appointment.duration,
      locationId: appointment.clinic.id,
      serviceId: appointment.serviceId,
      isSelfPay: appointment.isSelfPay,
    })

    if (result.state === 'error') {
      setError(result.error)
      setLoading(false)
      return
    }

    toast({
      type: 'success',
      title: 'Visit Medium Updated',
    })

    setOpen(false)
    setLoading(false)

    router.refresh()
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={() => {
        setOpen(!open)
        setError(undefined)
      }}
    >
      <Dialog.Trigger>
        <Button variant="outline" highContrast className="w-full" color="gray">
          <Text className="whitespace-nowrap">
            {appointment.type === AppointmentType.InPerson
              ? 'Change to Virtual'
              : 'Change to In-Person'}
          </Text>
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative">
        <CloseDialogIcon />
        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Change Visit Medium
        </Dialog.Title>
        <FormError message={error} />
        <Dialog.Description size="3" className="text-slate-11">
          Update{' '}
          {appointment.type === AppointmentType.InPerson
            ? 'in-person visit to virtual visit?'
            : 'virtual visit to in-person visit?'}{' '}
        </Dialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="outline" color="gray" highContrast>
              Cancel
            </Button>
          </Dialog.Close>
          <Button
            color="tomato"
            type="submit"
            disabled={loading}
            onClick={onConfirmation}
          >
            Confirm
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ChangeVisitMedium }
