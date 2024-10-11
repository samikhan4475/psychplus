'use client'

import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BillingCommentFormSchemaType } from './billing-comment-form'

const AddButton = () => {
  const form = useFormContext<BillingCommentFormSchemaType>()
  return (
    <Button
      size="1"
      color="gray"
      type="submit"
      loading={form.formState.isSubmitting}
      className="bg-pp-black-1 text-white ml-auto cursor-pointer px-3 py-1.5"
    >
      Add
    </Button>
  )
}

export { AddButton }
