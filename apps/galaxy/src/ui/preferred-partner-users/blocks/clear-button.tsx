'use client'

import { Button } from '@radix-ui/themes'
import { FieldValues, useForm } from 'react-hook-form'

interface ClearButtonProps<T extends FieldValues> {
  ppid: string
  form: ReturnType<typeof useForm<T>>
  onClear: (ppid: string) => void
  initialValues: T
}

const ClearButton = <T extends FieldValues>({ ppid, form, onClear, initialValues }: ClearButtonProps<T>) => {
  const handleResetForm = () => {
    onClear(ppid)
    form.reset({ ...initialValues })
  }
  return (
    <Button
      size="1"
      variant="outline"
      color="gray"
      type="button"
      className="text-black disabled:text-gray-5"
      onClick={handleResetForm}
    >
      Clear
    </Button>
  )
}

export { ClearButton }
