'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { CheckNumberField } from './check-number-field'
import { ClaimNumberField } from './claim-number-field'
import { FromDateField } from './from-date-field'
import { IcnField } from './icn-field'
import { InsuranceNameField } from './insurance-name-field'
import { ResetButton } from './reset-button'
import { ToDateField } from './to-date-field'
import { useStore } from '../response-history-tab/store'

const schema = z.object({
  fromDate: z.custom<DateValue>().nullable(),
  toDate: z.custom<DateValue>().nullable(),
  claimNumber: z.string().optional(),
  checkNumber: z.string().trim().optional(),
  insuranceName: z.string().optional(),
  icn: z.string().trim().optional(),
})

type SchemaType = z.infer<typeof schema>

const DenialFilterForm = () => {
  const { search } = useStore((state) => ({
    search: state.search,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {},
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    // API Implementation will be done here
    search()
  }

  return (
    <FormContainer
      className="bg-white flex-row gap-1.5 rounded-b-2 rounded-t-1 px-2 py-1 shadow-2"
      form={form}
      onSubmit={onSubmit}
    >
      <ClaimNumberField />
      <CheckNumberField />
      <FromDateField />
      <ToDateField />
      <IcnField />
      <InsuranceNameField />
      <ResetButton />
      <Button highContrast size="1" type="submit">
        <MagnifyingGlassIcon strokeWidth={2} />
      </Button>
    </FormContainer>
  )
}

export { DenialFilterForm, type SchemaType }
