'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { MRNInput } from './mrn-input'
import { ResetButton } from './reset-button'
import { SubmitButton } from './submit-button'

const schema = z.object({
  mrn: z.string().optional(),
})
type SchemaType = z.infer<typeof schema>

const LinkAccountForm = () => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {},
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    // #TODO Search api
  }

  return (
    <FormContainer
      className="flex flex-row gap-1 rounded-b-2 rounded-t-1 px-2 py-1"
      form={form}
      onSubmit={onSubmit}
    >
      <MRNInput />
      <ResetButton />
      <SubmitButton />
    </FormContainer>
  )
}

export { LinkAccountForm, type SchemaType }
