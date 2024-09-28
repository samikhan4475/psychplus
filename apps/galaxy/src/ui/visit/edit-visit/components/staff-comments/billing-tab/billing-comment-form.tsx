'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FormContainer } from '@/components'
import { AddCommentButton } from './add-comment-button'
import { CommentInput } from './comment-input'

const schema = z.object({
  comment: z.string().min(1, 'Required'),
})

export type BillingCommentFormSchemaType = z.infer<typeof schema>

const BillingCommentForm = () => {
  const form = useForm<BillingCommentFormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      comment: '',
    },
  })

  const onSubmit: SubmitHandler<BillingCommentFormSchemaType> = () => {}

  return (
    <FormContainer className="flex-row gap-2" form={form} onSubmit={onSubmit}>
      <CommentInput />
      <AddCommentButton />
    </FormContainer>
  )
}

export { BillingCommentForm }
