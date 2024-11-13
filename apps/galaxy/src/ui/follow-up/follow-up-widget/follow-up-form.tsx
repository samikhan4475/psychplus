'use client'

import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { Appointment } from '@/types'
import { getBookedAppointmentsAction } from '@/ui/schedule/actions'
import { CalenderView } from './calender-view'
import { CreateFollowUpButton } from './create-follow-up-button'
import { LocationDropdown, ProviderDropdown } from './form-fields'
import { NextDropdown } from './form-fields/next-dropdown'
import { getEndDate } from './utils'

const schema = z.object({
  next: z.string(),
  location: z.string().optional(),
  provider: z.string().optional(),
})

export type SchemaType = z.infer<typeof schema>

const FollowUpForm = ({
  patientId,
  appointmentId,
}: {
  patientId: string
  appointmentId: string
}) => {
  const [loading, setLoading] = useState(false)
  const [appointment, setAppointment] = useState<Appointment>()

  useEffect(() => {
    const fetchAppointmentData = async () => {
      setLoading(true)
      const response = await getBookedAppointmentsAction({
        patientIds: [Number(patientId)],
        appointmentIds: [Number(appointmentId)],
      })

      if (response.state === 'error') {
        return <div>fail</div>
      }

      setAppointment(response.data[0])
      setLoading(false)
    }

    fetchAppointmentData()
  }, [patientId, appointmentId])

  useEffect(() => {
    if (appointment) {
      form.setValue('location', appointment.locationId)
      form.setValue('provider', String(appointment.providerId))
    }
  }, [appointment])

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      next: '4week',
      location: '',
      provider: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const payload = {
      locationId: data.location,
      providerIds: [data.provider],
      patientIds: [Number(patientId)],
      appointmentIds: [Number(appointmentId)],
      startingDate: new Date().toISOString(),
      endingDate: getEndDate(data.next).toISOString(),
    }

    console.log('payload', payload)
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Flex align="center" gap="2">
        <NextDropdown />
        <LocationDropdown disabled={loading} />
        <ProviderDropdown appointment={appointment} disabled={loading} />

        <CreateFollowUpButton appointment={appointment} disabled={loading} />
        <CalenderView />
      </Flex>
    </FormContainer>
  )
}

export { FollowUpForm }
