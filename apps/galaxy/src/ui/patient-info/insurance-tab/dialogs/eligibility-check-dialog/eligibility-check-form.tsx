'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Grid } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FormContainer } from '@/components'
import { EndDatePicker } from './end-date-picker'
import { ProviderSelect } from './provider-select'
import { SpecialDateSelect } from './service-data-select'
import { SpecialTypeSelect } from './special-type-select'
import { StartDatePicker } from './start-date-picker'
import { VerifyButton } from './verify-button'

const schema = z.object({
  provider: z.string().optional(),
  serviceType: z.string().optional(),
  serviceDate: z.string().optional(),
  startDate: z.custom<DateValue>(),
  endDate: z.custom<DateValue>(),
})
type EligibilityCheckSchemaType = z.infer<typeof schema>

const EligibilityCheckForm = () => {
  const form = useForm<EligibilityCheckSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      provider: 'Dr. John Smith',
      serviceType: 'Psych Therapy',
      serviceDate: 'Custom',
      startDate: undefined,
      endDate: undefined,
    },
  })

  const onSubmit: SubmitHandler<EligibilityCheckSchemaType> = (data) => {
    console.log('Form Submitted:', data)
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Flex gap="3" direction="column" width="580px">
        <Grid gap="2" columns="2">
          <ProviderSelect />
          <SpecialTypeSelect />
        </Grid>
        <Grid columns="3" gap="4">
          <SpecialDateSelect />
          <StartDatePicker />
          <EndDatePicker />
        </Grid>
        <VerifyButton />
      </Flex>
    </FormContainer>
  )
}

export { EligibilityCheckForm }
