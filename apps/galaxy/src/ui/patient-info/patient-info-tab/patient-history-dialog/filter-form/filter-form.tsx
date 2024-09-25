'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { DateValue } from 'react-aria-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FormContainer } from '@/components'
import { FromDataInput } from './from-date-input'
import { NameInput } from './name-input'
import { ToDataInput } from './to-date-input'

const schema = z.object({
  toDate: z.custom<DateValue>(),
  fromDate: z.custom<DateValue>(),
  name: z.string().optional(),
})

export type FilterFormSchemaType = z.infer<typeof schema>

const FilterForm = () => {
  const form = useForm<FilterFormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      fromDate: undefined,
      name: '',
      toDate: undefined,
    },
  })
  const onSubmit: SubmitHandler<FilterFormSchemaType> = () => {}
  return (
    <FormContainer form={form} onSubmit={onSubmit} className="flex-row gap-2">
      <FromDataInput />
      <ToDataInput />
      <NameInput />
    </FormContainer>
  )
}

export { FilterForm }
