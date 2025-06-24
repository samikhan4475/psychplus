'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button, TextField } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import {
  CodesetSelect,
  DatePickerInput,
  DropdownSelect,
  FormContainer,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { formatDateToISOString, sanitizeFormData } from '@/utils'
import { useStore } from './store'
import { InsurancePlanListSearchParams } from './types'

const schema = z.object({
  recordStatuses: z.array(z.string()),
  payerName: z.string().optional(),
  insurancePlanName: z.string().optional(),
  networkStatus: z.string().optional(),
  planStatus: z.string().optional(),
  effectiveDate: z.custom<DateValue | null>(),
  fromDate: z.custom<DateValue | null>(),
  toDate: z.custom<DateValue | null>(),
})

type SchemaType = z.infer<typeof schema>

const networkStatusOptions = [
  { label: 'IN', value: 'InNetwork' },
  { label: 'OON', value: 'OutOfNetwork' },
]

const PracticePlanListForm = () => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      recordStatuses: ['Active'],
      payerName: '',
      insurancePlanName: '',
      networkStatus: '',
      planStatus: '',
      effectiveDate: null,
      fromDate: null,
      toDate: null,
    },
  })
  const search = useStore((state) => state.search)
  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    const formattedData = {
      ...data,
      fromDate: formatDateToISOString(data.fromDate),
      toDate: formatDateToISOString(data.toDate),
      effectiveDate: data.effectiveDate
        ? formatDateToISOString(data.effectiveDate)
        : undefined,
      planStatus: data.planStatus === 'Active',
    }
    const cleanedData = sanitizeFormData(
      formattedData,
    ) as InsurancePlanListSearchParams

    search({
      ...cleanedData,
      ...(data.planStatus && { planStatus: data.planStatus === 'Active' }),
    })
  }

  const onClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    form.reset()
    search()
  }

  return (
    <FormContainer
      className="bg-white flex-row flex-wrap items-center  gap-1.5 rounded-b-2 rounded-t-1 px-2 py-1 shadow-2"
      form={form}
      onSubmit={onSubmit}
    >
      <FormFieldContainer className="flex-row items-center gap-1">
        <FormFieldLabel>From</FormFieldLabel>
        <DatePickerInput field="fromDate" className="w-[101px]" />
      </FormFieldContainer>
      <FormFieldContainer className="flex-row items-center gap-1">
        <FormFieldLabel>To</FormFieldLabel>
        <DatePickerInput field="toDate" className="w-[101px]" />
      </FormFieldContainer>
      <FormFieldContainer className="flex-row items-center gap-1">
        <FormFieldLabel>Payer Name</FormFieldLabel>
        <TextField.Root
          size="1"
          className="border-pp-gray-2 h-5 w-[130px] border border-solid !outline-none [box-shadow:none]"
          {...form.register('payerName')}
          placeholder="123455"
        />
      </FormFieldContainer>
      <FormFieldContainer className="flex-row items-center gap-1">
        <FormFieldLabel>Plan Name</FormFieldLabel>
        <TextField.Root
          size="1"
          className="border-pp-gray-2 h-5 w-[130px] border border-solid !outline-none [box-shadow:none]"
          {...form.register('insurancePlanName')}
          placeholder="123455"
        />
      </FormFieldContainer>
      <FormFieldContainer className="flex-row items-center gap-1">
        <FormFieldLabel>Effective Date</FormFieldLabel>
        <DatePickerInput field="effectiveDate" className="w-[101px]" />
      </FormFieldContainer>
      <FormFieldContainer className="flex-row items-center gap-1">
        <FormFieldLabel>Plan Status</FormFieldLabel>
        <CodesetSelect
          size="1"
          name="planStatus"
          className="w-[120px]"
          exclude={['Deleted', 'Archived']}
          codeset={CODESETS.RecordStatus}
        />
      </FormFieldContainer>
      <FormFieldContainer className="flex-row items-center gap-1">
        <FormFieldLabel>Network Status</FormFieldLabel>
        <DropdownSelect
          className="w-[100px]"
          options={networkStatusOptions}
          field="networkStatus"
        />
      </FormFieldContainer>
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
      <Button highContrast size="1" type="submit">
        <MagnifyingGlassIcon strokeWidth={2} />
      </Button>
    </FormContainer>
  )
}

export { PracticePlanListForm, type SchemaType }
