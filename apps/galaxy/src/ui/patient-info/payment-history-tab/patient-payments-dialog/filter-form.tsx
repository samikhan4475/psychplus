'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { DateValue } from 'react-aria-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FormContainer } from '@/components'
import { ClearButton } from './clear-button'
import { DateInputFrom } from './date-input-from'
import { DateInputTo } from './date-input-to'
import { PaymentMethodSelect } from './payment-method-select'
import { SearchButton } from './search-button'
import { useStore } from './store'

const schema = z.object({
  fromDate: z.custom<DateValue>().nullable(),
  toDate: z.custom<DateValue>().nullable(),
  paymentMethod: z.string().optional(),
})

type SchemaType = z.infer<typeof schema>

interface FilterFormProps {
  patientId: string
}
const FilterForm = ({ patientId }: FilterFormProps) => {
  const { fetchPatientPayments } = useStore((state) => ({
    fetchPatientPayments: state.fetchPatientPayments,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      fromDate: null,
      toDate: null,
      paymentMethod: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    return fetchPatientPayments(patientId, data)
  }
  return (
    <FormContainer
      form={form}
      onSubmit={onSubmit}
      className="flex-row items-center gap-2"
    >
      <DateInputFrom />
      <DateInputTo />
      <PaymentMethodSelect />
      <ClearButton patientId={patientId} />
      <SearchButton />
    </FormContainer>
  )
}

export { FilterForm, type SchemaType }
