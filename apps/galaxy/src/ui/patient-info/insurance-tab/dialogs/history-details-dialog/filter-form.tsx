'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@radix-ui/themes'
import { Search } from 'lucide-react'
import { DateValue } from 'react-aria-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FormContainer } from '@/components'
import { FromDataPicker } from './from-date-picker'
import { NameInput } from './name-input'
import { useStore } from './store'
import { ToDataPicker } from './to-date-picker'

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
        message: 'Please enter the "From" date.',
        path: ['historyCreatedFrom'],
      })
    }
  })

type SchemaType = z.infer<typeof schema>

interface FilterFormProps {
  patientId: string
  policyId: string
}

const FilterForm = ({ patientId, policyId }: FilterFormProps) => {
  const { fetchInsuranceHistories } = useStore((state) => ({
    fetchInsuranceHistories: state.fetchInsuranceHistories,
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
    return fetchInsuranceHistories(patientId, policyId, data)
  }

  const handleResetForm = () => {
    fetchInsuranceHistories(patientId, policyId)
    form.reset({
      historyCreatedTo: undefined,
      historyCreatedFrom: undefined,
      username: '',
    })
  }
  return (
    <FormContainer
      form={form}
      onSubmit={onSubmit}
      className="flex-row items-start gap-2"
    >
      <FromDataPicker />
      <ToDataPicker />
      <NameInput />
      <Button size="1" highContrast type="submit">
        <Search width={14} height={14} />
      </Button>
      <Button
        size="1"
        variant="outline"
        color="gray"
        type="button"
        className="text-black"
        onClick={handleResetForm}
      >
        Clear
      </Button>
    </FormContainer>
  )
}

export { FilterForm, type SchemaType }
