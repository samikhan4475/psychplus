'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import {
  CommentInput,
  DateFromInput,
  DateToInput,
  filterFormDefaultValues,
  filterFormschema,
  FilterFormSchemaType,
  StaffSelect,
} from '../shared'
import { useStore } from '../store'

const TreatmentFilterForm = () => {
  const { staffOptions } = useStore((state) => ({
    staffOptions: state.staffOptions,
  }))

  const form = useForm<FilterFormSchemaType>({
    resolver: zodResolver(filterFormschema),
    defaultValues: filterFormDefaultValues,
  })

  const onSubmit: SubmitHandler<FilterFormSchemaType> = () => {}
  return (
    <FormContainer
      form={form}
      onSubmit={onSubmit}
      className="bg-white w-full flex-row justify-start gap-[6px] rounded-1 px-2 py-1 shadow-4"
    >
      <DateFromInput />
      <DateToInput />
      <StaffSelect staffOptions={staffOptions ?? []} />
      <CommentInput />

      <Button color="gray" size="1" className="text-black" variant="outline">
        Clear
      </Button>
      <Button size="1" highContrast>
        <MagnifyingGlassIcon />
      </Button>
    </FormContainer>
  )
}

export { TreatmentFilterForm }
