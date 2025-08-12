'use client'

import { Button } from '@radix-ui/themes'
import { FieldValues, useFormContext } from 'react-hook-form'

interface ClearButtonProps<T extends FieldValues> {
  getInitialValues?: () => T
}

const ClearButton = <T extends FieldValues>({
  getInitialValues,
}: ClearButtonProps<T>) => {
  const form = useFormContext<T>()
  return (
    <Button
      variant="outline"
      size="1"
      color="gray"
      className="text-black"
      onClick={(e) => {
        e.preventDefault()
        if (getInitialValues) {
          form.reset(getInitialValues())
        } else {
          form.reset()
        }
      }}
    >
      Clear
    </Button>
  )
}

export { ClearButton }
