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

const schema = z.object({
  dateRange: z.string().optional(),
  startDate: z.custom<DateValue>(),
  endDate: z.custom<DateValue>(),
  chargeType: z.string().optional(),
})

type PaymentFilterSchemaType = z.infer<typeof schema>

const FilterForm = () => {
  const form = useForm<PaymentFilterSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      dateRange: '',
      startDate: undefined,
      endDate: undefined,
      chargeType: '',
    },
  })

  const onSubmit: SubmitHandler<PaymentFilterSchemaType> = (data) => {
    console.log('Form submitted with data:', data)
  }
  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Flex gap="2" align="center">
        <DateRangeSelect />
        <StartDatePicker />
        <EndDatePicker />
        <ChargeTypeSelect />
        <Flex gap="2" align="center">
          <Button type="submit" size="1" highContrast>
            <Search height={14} width={14} />
          </Button>
          <Button
            variant="outline"
            color="gray"
            size="1"
            className="text-black  font-regular"
          >
            Clear
          </Button>
        </Flex>
      </Flex>
    </FormContainer>
  )
}

export { FilterForm,type PaymentFilterSchemaType }
