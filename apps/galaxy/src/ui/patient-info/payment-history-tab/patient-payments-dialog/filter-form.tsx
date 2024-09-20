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

const schema = z.object({
  dateFrom: z.custom<DateValue | null>(),
  dateTo: z.custom<DateValue | null>(),
  paymentMethod: z.string().optional(),
})

export type FilterFormSchemaType = z.infer<typeof schema>

const FilterForm = () => {
  const form = useForm<FilterFormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      dateFrom: null,
      dateTo: null,
      paymentMethod: '',
    },
  })

  const onSubmit: SubmitHandler<FilterFormSchemaType> = () => {}
  return (
    <FormContainer
      form={form}
      onSubmit={onSubmit}
      className="flex-row items-center gap-2"
    >
      <DateInputFrom />
      <DateInputTo />
      <PaymentMethodSelect />
      <ClearButton />
      <SearchButton />
    </FormContainer>
  )
}

export { FilterForm }
