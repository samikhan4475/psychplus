import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FormContainer } from '@/components'
import { AddLocationSelect } from './add-location-select'
import { StateSelect } from './state-select'

const schema = z.object({
  stateName: z.string().optional(),
})

type SchemaType = z.infer<typeof schema>

const StaffLocationFilter = () => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onSubmit',
    defaultValues: {
      stateName: '',
    },
  })
  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    //    handle form submission
  }
  return (
    <FormContainer
      className="bg-white ml-6 flex-row gap-x-2"
      form={form}
      onSubmit={onSubmit}
    >
      <StateSelect />
      <AddLocationSelect />
    </FormContainer>
  )
}

export { StaffLocationFilter, type SchemaType }
