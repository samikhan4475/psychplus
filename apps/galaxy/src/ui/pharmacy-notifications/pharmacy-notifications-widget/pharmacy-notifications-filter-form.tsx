'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button, Flex } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { getPaddedDateString, sanitizeFormData } from '@/utils'
import { NotificationFromDateField } from './date-from-date-field'
import { NotificationToDateField } from './date-to-field'
import { NotificationStatusField } from './notification-status-field'
import { NotificationTypeField } from './notification-type-field'
import { PatientField } from './patient-field'
import { useStore } from './store'

const schema = z.object({
  notificationStatusStartDate: z.custom<DateValue | null>().nullable(),
  notificationStatusEndDate: z.custom<DateValue | null>().nullable(),
  patientName: z.string().optional(),
  notificationStatus: z.string().optional(),
  notificationType: z.string().trim().optional(),
})
export type SchemaType = z.infer<typeof schema>

const PharmacyNotificationsFilterForm = () => {
  const { fetch } = useStore()

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      notificationStatusStartDate: null,
      notificationStatusEndDate: null,
      patientName: '',
      notificationType: '',
      notificationStatus: '',
    },
  })

  const onClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    form.reset({
      notificationStatusStartDate: null,
      notificationStatusEndDate: null,
      notificationType: '',
      notificationStatus: '',
      patientName: '',
    })
    fetch({}, 1, true)
  }

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const [patientFirstName, patientLastName] = data.patientName?.split(' ') || []

    const formattedData = {
      ...data,
      patientFirstName,
      patientLastName,
      notificationStatusStartDate: data.notificationStatusStartDate
        ? getPaddedDateString(data.notificationStatusStartDate)
        : null,
      notificationStatusEndDate: data.notificationStatusEndDate
        ? getPaddedDateString(data.notificationStatusEndDate)
        : null,
    }
    const sanitizedData = sanitizeFormData(formattedData)
    const payload = {
      ...sanitizedData,
    }
    fetch(payload, 1, true)
  }

  return (
    <FormContainer
      className="bg-white flex flex-col gap-2 rounded-b-2 rounded-t-1 px-2 py-1 shadow-2"
      form={form}
      onSubmit={onSubmit}
    >
      <Flex gap="2" wrap="wrap">
        <NotificationFromDateField />
        <NotificationToDateField />
        <PatientField />
        <NotificationTypeField />
        <NotificationStatusField />
        <Button highContrast size="1" type="submit">
          <MagnifyingGlassIcon strokeWidth={2} />
        </Button>
        <Button
          color="gray"
          className="text-black"
          size="1"
          variant="outline"
          type="button"
          onClick={onClear}
        >
          Clear
        </Button>
      </Flex>
    </FormContainer>
  )
}

export { PharmacyNotificationsFilterForm }
