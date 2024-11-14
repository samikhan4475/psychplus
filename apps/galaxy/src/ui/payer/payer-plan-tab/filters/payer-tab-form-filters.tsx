'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { PayerName } from './payer-name'
import { PayerStatus } from './payer-status'
import { PayerType } from './payer-type'
import { PlanName } from './plan-name'
import { ResetButton } from './reset-button'
import { SubmitButton } from './submit-button'

const schema = z.object({
  payer: z.string().optional(),
})

type SchemaType = z.infer<typeof schema>

const PayerListFilterForm = () => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      payer: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = () => {
    //   # TODO Api Integration
  }

  return (
    <FormContainer
      className="bg-white flex flex-row gap-1.5 rounded-b-2 rounded-t-1 px-2 py-1 shadow-2"
      form={form}
      onSubmit={onSubmit}
    >
      <PayerName />
      <PlanName />
      <PayerType />
      <PayerStatus />
      <ResetButton />
      <SubmitButton />
    </FormContainer>
  )
}

export { PayerListFilterForm, type SchemaType }
