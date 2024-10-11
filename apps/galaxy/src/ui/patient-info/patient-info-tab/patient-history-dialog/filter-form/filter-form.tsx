'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { DateValue } from 'react-aria-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FormContainer } from '@/components'
import { useStore } from '../store'
import { ClearButton } from './clear-button'
import { FromDatePicker } from './from-date-picker'
import { NameInput } from './name-input'
import { SaveButton } from './save-button'
import { ToDatePicker } from './to-date-picker'

const schema = z
  .object({
    historyCreatedFrom: z.custom<DateValue | undefined>().optional(),
    historyCreatedTo: z.custom<DateValue | undefined>().optional(),
    username: z.string().optional().default(''),
  })
  .superRefine((data, ctx) => {
    if (data.historyCreatedTo && !data.historyCreatedFrom) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'From date is required',
        path: ['historyCreatedFrom'],
      })
    }
  })

type SchemaType = z.infer<typeof schema>

interface FilterFormProps {
  patientId: string
}

const FilterForm = ({ patientId }: FilterFormProps) => {
  const { fetchPatientInfoHistories } = useStore((state) => ({
    fetchPatientInfoHistories: state.fetchPatientInfoHistories,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      historyCreatedFrom: undefined,
      historyCreatedTo: undefined,
      username: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    return fetchPatientInfoHistories(patientId, data)
  }

  return (
    <FormContainer
      form={form}
      onSubmit={onSubmit}
      className="flex-row items-start gap-2"
    >
      <FromDatePicker />
      <ToDatePicker />
      <NameInput />
      <SaveButton />
      <ClearButton patientId={patientId} />
    </FormContainer>
  )
}

export { FilterForm, type SchemaType }
