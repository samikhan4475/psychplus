'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex } from '@radix-ui/themes'
import { Search } from 'lucide-react'
import { DateValue } from 'react-aria-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { ChargeTypeSelect } from './charge-type-select'
import { DateRangeSelect } from './date-range-select'
import { EndDatePicker } from './end-date-picker'
import { StartDatePicker } from './start-date-picker'
import { useStore } from './store'

const schema = z.object({
  dateRange: z.string().optional(),
  patientIds: z.array(z.string()),
  startDate: z.custom<DateValue>().optional(),
  endDate: z.custom<DateValue>().optional(),
  chargeType: z.string().optional(),
  preferredPartnerIds: z.array(z.string()).optional(),
})

type SchemaType = z.infer<typeof schema>
interface FilterFormProps {
  patientId: string
}
const FilterForm = ({ patientId }: FilterFormProps) => {
  const { fetchPatientPaymentHistory } = useStore((state) => ({
    fetchPatientPaymentHistory: state.fetchPatientPaymentHistory,
  }))
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      dateRange: 'All',
      startDate: undefined,
      endDate: undefined,
      chargeType: '',
      patientIds: [patientId],
      preferredPartnerIds: [],
    },
    mode: 'onChange',
  })
  const { isSubmitting } = form.formState
  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    return fetchPatientPaymentHistory(data, 1, true)
  }
  const handleReset = async () => {
    fetchPatientPaymentHistory(
      {
        patientIds: [patientId],
      },
      1,
      true,
    )
    form.reset({
      dateRange: 'All',
      startDate: undefined,
      endDate: undefined,
      chargeType: '',
      patientIds: [patientId],
      preferredPartnerIds: [],
    })
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit} className="px-2">
      <Flex gap="2" align="center">
        <DateRangeSelect />
        <StartDatePicker disabled={isSubmitting} />
        <EndDatePicker disabled={isSubmitting} />
        <ChargeTypeSelect />
        <Flex gap="2" align="center">
          <Button type="submit" size="1" highContrast>
            <Search height={14} width={14} />
          </Button>
          <Button
            variant="outline"
            color="gray"
            type="button"
            size="1"
            className="text-black"
            onClick={handleReset}
          >
            Clear
          </Button>
        </Flex>
      </Flex>
    </FormContainer>
  )
}

export { FilterForm, type SchemaType }
