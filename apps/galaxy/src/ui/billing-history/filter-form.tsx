'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button, Flex } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FormContainer } from '@/components'
import { getCalendarDateLabel } from '@/utils'
import { ClaimNoInput } from './claim-no-input'
import { EndDateInput } from './end-date-input'
import { InsuranceSelect } from './insurance-select'
import { LocationsSelect } from './locations-select'
import { StartDateInput } from './start-date-input'
import { useStore } from './store'
import { sanitizeObject } from './utils'

const schema = z.object({
  claimNo: z.string().optional(),
  fromDate: z.custom<DateValue | null>().optional(),
  endDate: z.custom<DateValue | null>().optional(),
  locationId: z.string().optional(),
  insurance: z.string().optional(),
})
type BillingFilterSchemaType = z.infer<typeof schema>

interface BillingFilterFormProps {
  patientId: string
}
const BillingFilterForm = ({ patientId }: BillingFilterFormProps) => {
  const { toggleFilters, fetchBillingHistory } = useStore((state) => ({
    toggleFilters: state.toggleFilters,
    fetchBillingHistory: state.fetchBillingHistory,
  }))

  const form = useForm<BillingFilterSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      claimNo: '',
      fromDate: null,
      endDate: null,
      insurance: '',
      locationId: '',
    },
  })
  const { isDirty, isSubmitting } = form.formState
  const onSubmit: SubmitHandler<BillingFilterSchemaType> = (data) => {
    if (!isDirty) return
    const sanitizedData = sanitizeObject({
      FromDate: data.fromDate ? getCalendarDateLabel(data.fromDate) : '',
      EndDate: data.endDate ? getCalendarDateLabel(data.endDate) : '',
      ClaimNo: data.claimNo,
      LocationId: data.locationId ? [data.locationId] : undefined,
      Insurance: data.insurance,
    })
    return fetchBillingHistory(patientId, sanitizedData)
  }
  const handleReset = () => {
    if (!isDirty) return
    form.reset()
    fetchBillingHistory(patientId)
  }
  return (
    <FormContainer
      form={form}
      onSubmit={onSubmit}
      className="bg-white z-[1] rounded-bl-1 rounded-br-1 p-2"
    >
      <Flex align="center" gap="2" wrap="wrap" width="100%">
        <ClaimNoInput />
        <StartDateInput disabled={isSubmitting} />
        <EndDateInput disabled={isSubmitting} />
        <LocationsSelect />
        <InsuranceSelect />
        <Flex align="center" className="px-2">
          <Button
            size="1"
            variant="ghost"
            className="text-1 font-regular text-indigo-12"
            color="indigo"
            type="button"
            onClick={toggleFilters}
          >
            Hide Filters
          </Button>
        </Flex>
        <Button
          size="1"
          color="gray"
          className="text-black"
          variant="outline"
          onClick={handleReset}
        >
          Clear
        </Button>
        <Button type="submit" size="1" highContrast>
          <MagnifyingGlassIcon width="14px" height="14px" />
        </Button>
      </Flex>
    </FormContainer>
  )
}

export { BillingFilterForm, type BillingFilterSchemaType }
