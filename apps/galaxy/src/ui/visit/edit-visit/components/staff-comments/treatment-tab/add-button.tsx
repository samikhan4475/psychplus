'use client'

import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { TreatmentCommentFormSchemaType } from '../treatment-tab/treatment-comment-form'

const AddButton = () => {
  const form = useFormContext<TreatmentCommentFormSchemaType>()
  return (
    <Button
      color="gray"
      size="1"
      className="bg-pp-black-1 text-white ml-auto cursor-pointer px-3 py-1.5"
      type="submit"
      loading={form.formState.isSubmitting}
    >
      Add
    </Button>
  )
}

export { AddButton }
