'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { PayerPlanFilter } from '@/types'
import { sanitizeFormData } from '@/utils'
import { useStore } from '../store'
import { PayerName } from './payer-name'
import { PayerStatus } from './payer-status'
import { PayerType } from './payer-type'
import { PlanName } from './plan-name'
import { ResetButton } from './reset-button'
import { SubmitButton } from './submit-button'

const schema = z.object({
  name: z.string().optional(),
  payerName: z.string().optional(),
  payerType: z.string().optional(),
  isPlanStatusActive: z.boolean().optional(),
  isIncludePayer: z.boolean().optional(),
  includeTest: z.boolean().optional(),
  payerStatus: z.string().optional(),
})

type SchemaType = z.infer<typeof schema>

const PayerListFilterForm = () => {
  const { search } = useStore((state) => ({
    search: state.search,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      payerName: '',
      payerType: '',
      isPlanStatusActive: false,
      isIncludePayer: false,
      includeTest: false,
      payerStatus: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const cleanedData = sanitizeFormData(data) as Partial<PayerPlanFilter>

    const formattedData = {
      ...cleanedData,
      ...(cleanedData.payerStatus &&
        cleanedData.payerStatus !== '' && {
          isPlanStatusActive: cleanedData.payerStatus === 'Active',
        }),
    }
    search(formattedData)
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
