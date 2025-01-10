'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FormContainer } from '@/components'
import { cn, sanitizeFormData } from '@/utils'
import { ClaimNoInput } from './claim-no-input'
import { DateTypeSelect } from './date-type-select'
import { EndDateInput } from './end-date-input'
import { FiltersToggleButton } from './filters-toggle-button'
import { InsuranceSelect } from './insurance-select'
import { LocationsSelect } from './locations-select'
import { ResetButton } from './reset-button'
import { StartDateInput } from './start-date-input'
import { useStore } from './store'
import { SubmitButton } from './submit-button'

const schema = z.object({
  patientId: z.string().optional(),
  claimNumber: z.string().optional(),
  fromDate: z.custom<DateValue | null>().optional(),
  endDate: z.custom<DateValue | null>().optional(),
  dateType: z.string().optional(),
  locationId: z.string().optional(),
  patientInsurancePayerId: z.string().optional(),
})
type BillingFilterSchemaType = z.infer<typeof schema>

interface BillingFilterFormProps {
  patientId: string
}
const BillingFilterForm = ({ patientId }: BillingFilterFormProps) => {
  const { showFilters, fetchBillingHistory, formValues } = useStore(
    (state) => ({
      showFilters: state.showFilters,
      fetchBillingHistory: state.fetchBillingHistory,
      formValues: state.formValues,
    }),
  )
  const form = useForm<BillingFilterSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: { ...formValues, patientId },
    mode: 'onBlur',
  })
  const { isSubmitting } = form.formState
  const onSubmit: SubmitHandler<BillingFilterSchemaType> = (data) => {
    const sanitizedData = sanitizeFormData({
      ...data,
    })
    return fetchBillingHistory(sanitizedData)
  }

  return (
    <FormContainer
      form={form}
      onSubmit={onSubmit}
      className={cn(
        'bg-white z-[1] w-full flex-row justify-between rounded-bl-1 rounded-br-1 p-2',
        {
          'justify-end': !showFilters,
        },
      )}
    >
      {showFilters && (
        <Flex align="center" gap="2" wrap="wrap">
          <ClaimNoInput />
          <InsuranceSelect />
          <LocationsSelect />
          <DateTypeSelect />
          <StartDateInput disabled={isSubmitting} />
          <EndDateInput disabled={isSubmitting} />
        </Flex>
      )}
      <Flex gap="2" align="center">
        <FiltersToggleButton />
        <ResetButton patientId={patientId} />
        <SubmitButton />
      </Flex>
    </FormContainer>
  )
}

export { BillingFilterForm, type BillingFilterSchemaType }
