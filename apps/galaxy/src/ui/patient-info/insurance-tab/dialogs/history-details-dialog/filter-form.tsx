'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { DateValue } from 'react-aria-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FormContainer } from '@/components'
import { FromDataPicker } from './from-date-picker'
import { NameInput } from './name-input'
import { ToDataPicker } from './to-date-picker'

const schema = z.object({
  toDate: z.custom<DateValue>(),
  fromDate: z.custom<DateValue>(),
  name: z.string().optional(),
})

type SchemaType = z.infer<typeof schema>
const FlterForm = () => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      fromDate: undefined,
      name: '',
      toDate: undefined,
    },
  })
  const onSubmit: SubmitHandler<SchemaType> = () => {}
  return (
    <FormContainer form={form} onSubmit={onSubmit} className="flex-row gap-2">
      <FromDataPicker />
      <ToDataPicker />
      <NameInput />
    </FormContainer>
  )
}

export { FlterForm }
