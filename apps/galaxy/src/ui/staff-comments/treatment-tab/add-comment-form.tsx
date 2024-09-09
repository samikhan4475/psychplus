'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex, Heading } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { AddCommentField, commentSchema, CommentSchemaType } from '../shared'

const AddCommentForm = () => {
  const form = useForm<CommentSchemaType>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: '',
    },
  })
  const onSubmit: SubmitHandler<CommentSchemaType> = () => {}
  return (
    <FormContainer
      form={form}
      onSubmit={onSubmit}
      className="bg-white w-full gap-2.5 rounded-1 p-2 shadow-4"
    >
      <Heading size="3">Add Comments</Heading>
      <Flex className="max-w-[561px] gap-[6px]" width={'100%'}>
        <AddCommentField />
        <Button highContrast size="1" type="submit">
          Save
        </Button>
      </Flex>
    </FormContainer>
  )
}

export { AddCommentForm }
