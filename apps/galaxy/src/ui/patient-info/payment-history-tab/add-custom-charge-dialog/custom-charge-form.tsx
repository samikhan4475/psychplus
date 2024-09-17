'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Grid } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { AmountInput } from './amount-input'
import { ChargeInput } from './charge-input'
import { DatePickerField } from './date-picker-input'
import { DescriptionInput } from './description-input'
import { SaveChargesButton } from './save-charges-button'
import { TimeSelect } from './time-select'
import { UnAppliedBalanceInput } from './un-applied-balance-input'

const schema = z.object({
  charge: z.string().optional(),
  description: z.string().optional(),
  unappliedBalance: z.string().optional(),
  date: z.custom<DateValue>(),
  time: z.string().optional(),
  amount: z.string().optional(),
})

type CustomChargeFilterSchemaType = z.infer<typeof schema>

const CustomChargeForm = () => {
  const form = useForm<CustomChargeFilterSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      charge: '',
      description: '',
      unappliedBalance: '',
      date: undefined,
      time: '',
      amount: '',
    },
  })

  const onSubmit: SubmitHandler<CustomChargeFilterSchemaType> = (data) => {
    console.log('Form submitted with data:', data)
  }
  return (
    <FormContainer form={form} onSubmit={onSubmit} className="mt-2">
      <Flex
        direction="column"
        className="rounded-2 border border-gray-3 px-2 py-2"
      >
        <Grid columns="2" gap="3">
          <ChargeInput />
          <DescriptionInput />
        </Grid>
        <Grid columns="4" gap="3" mt="3">
          <UnAppliedBalanceInput />
          <DatePickerField />
          <TimeSelect />
          <AmountInput />
        </Grid>
        <SaveChargesButton />
      </Flex>
    </FormContainer>
  )
}

export { CustomChargeForm }
