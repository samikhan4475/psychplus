'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { formatDateToISOString, sanitizeFormData } from '@/utils'
import { InsurancePaymentSearchParams } from '../types'
import { CheckNumberField } from './check-number-field'
import { DateTypeSelect } from './date-type-select'
import { FromDateField } from './from-date-field'
import { InsuranceNameField } from './insurance-name-field'
import { PaymentTypeSelect } from './payment-type-select'
import { ResetButton } from './reset-button'
import { useStore } from './store'
import { ToDateField } from './to-date-field'

const schema = z.object({
  fromDate: z.custom<DateValue>().nullable(),
  toDate: z.custom<DateValue>().nullable(),
  dateType: z.string().optional(),
  checkNumber: z.string().trim().optional(),
  insuranceName: z.string().optional(),
  paymentType: z.string().trim().optional(),
})

type SchemaType = z.infer<typeof schema>

const InsurancePaymentListFilterForm = () => {
  const { search } = useStore((state) => ({
    search: state.search,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      fromDate: undefined,
      toDate: undefined,
      checkNumber: '',
      insuranceName: '',
      dateType: '',
      paymentType: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const formattedData = {
      ...data,
      fromDate: formatDateToISOString(data.fromDate),
      toDate: formatDateToISOString(data.toDate, true),
    }
    const cleanedData = sanitizeFormData(
      formattedData,
    ) as InsurancePaymentSearchParams
    return search(cleanedData)
  }

  return (
    <FormContainer
      className="bg-white flex-row gap-1.5 rounded-b-2 rounded-t-1 px-2 py-1 shadow-2"
      form={form}
      onSubmit={onSubmit}
    >
      <PaymentTypeSelect />
      <CheckNumberField />
      <InsuranceNameField />
      <DateTypeSelect />
      <FromDateField />
      <ToDateField />
      <ResetButton />
      <Button highContrast size="1" type="submit">
        <MagnifyingGlassIcon strokeWidth={2} />
      </Button>
    </FormContainer>
  )
}

export { InsurancePaymentListFilterForm, type SchemaType }
