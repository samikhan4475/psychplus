'use client'

import { Button } from '@radix-ui/themes'
import { Plus } from 'lucide-react'
import { SubmitHandler, useFormContext } from 'react-hook-form'
import { SchemaType } from '../schema'

const CreateFollowUpButton = ({
  loading,
  onSubmit,
}: {
  loading: boolean
  onSubmit: SubmitHandler<SchemaType>
}) => {
  const form = useFormContext<SchemaType>()
  const onClick = () => {
    form.handleSubmit(onSubmit, () => form.trigger())()
  }
  return (
    <Button
      color="gray"
      className="text-black"
      size="1"
      variant="outline"
      type="button"
      onClick={onClick}
      disabled={loading}
      loading={loading}
    >
      <Plus width={16} height={16} />
      Follow up
    </Button>
  )
}

export { CreateFollowUpButton }
