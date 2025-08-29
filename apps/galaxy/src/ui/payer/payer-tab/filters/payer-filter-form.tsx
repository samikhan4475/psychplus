'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { PayerFilter } from '@/types'
import { sanitizeFormData } from '@/utils'
import { useStore } from '../store'
import { PayerName } from './payer-name'
import { PayerStatus } from './payer-status'
import { ResetButton } from './reset-button'
import { SubmitButton } from './submit-button'

const schema = z.object({
  payerName: z.string().optional(),
  recordStatus: z.string().optional(),
})

type SchemaType = z.infer<typeof schema>

const PayerFilterForm = () => {
  const { search } = useStore((state) => ({
    search: state.search,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      payerName: '',
      recordStatus: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const cleanedData = sanitizeFormData(data)

    // Convert string values to proper filter types
    const filterData: Partial<PayerFilter> = {
      payerName: cleanedData.payerName,
      recordStatus:
        cleanedData.recordStatus === 'all'
          ? undefined
          : cleanedData.recordStatus,
    }

    search(filterData)
  }

  return (
    <FormContainer
      className="bg-white flex flex-row gap-1.5 rounded-b-2 rounded-t-1 px-2 py-1 shadow-2"
      form={form}
      onSubmit={onSubmit}
    >
      <PayerName />
      <PayerStatus />
      <ResetButton />
      <SubmitButton />
    </FormContainer>
  )
}

export { PayerFilterForm, type SchemaType }
