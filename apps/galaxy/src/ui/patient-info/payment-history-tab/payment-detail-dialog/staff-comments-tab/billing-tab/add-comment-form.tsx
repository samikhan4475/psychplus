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

export type AddCommentFormSchemaType = z.infer<typeof schema>

const AddCommentForm = () => {
  const form = useForm<AddCommentFormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      comment: '',
    },
  })
  const onSubmit: SubmitHandler<AddCommentFormSchemaType> = () => {}
  return (
    <FormContainer form={form} onSubmit={onSubmit} className="flex-row gap-2">
      <CommentInput />
      <AddCommentButton />
    </FormContainer>
  )
}

export { AddCommentForm }
