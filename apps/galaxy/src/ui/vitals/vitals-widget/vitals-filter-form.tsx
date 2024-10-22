'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { removeEmptyValues } from '@/ui/notifications/patient-notifications-view/utils'
import { formatDateToISOString } from '@/utils'
import { ClearButton } from './buttons'
import { FromField, StatusSelect, ToField } from './filter-fields'
import { useStore, VitalsParams } from './store'
import { VitalsProps } from './types'

const schema = z.object({
  from: z.custom<DateValue>().nullable(),
  to: z.custom<DateValue>().nullable(),
  status: z.string().trim(),
})

type SchemaType = z.infer<typeof schema>

const VitalsFilterForm = ({ patientId, appointmentId }: VitalsProps) => {
  const { fetch } = useStore((state) => ({
    fetch: state.fetch,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      from: undefined,
      to: undefined,
      status: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const formattedData = {
      from: formatDateToISOString(data.from),
      to: formatDateToISOString(data.to, true),
      appointmentId,
      patientId,
      recordStatuses: [data.status],
    }

    const cleanedData = removeEmptyValues(formattedData)
    return fetch(cleanedData as VitalsParams)
  }

  return (
    <FormContainer
      className="bg-white flex-row gap-1.5"
      form={form}
      onSubmit={onSubmit}
    >
      <FromField />
      <ToField />
      <StatusSelect />

      <ClearButton patientId={patientId} appointmentId={appointmentId} />

      <Button highContrast size="1" type="submit">
        <MagnifyingGlassIcon strokeWidth={2} />
      </Button>
    </FormContainer>
  )
}

export { VitalsFilterForm }
