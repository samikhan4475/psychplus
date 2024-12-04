'use client'

import { Button } from '@radix-ui/themes'
import { FieldValues, useFormContext } from 'react-hook-form'

interface WidgetClearButtonProps<T extends FieldValues> {
  defaultInitialValues?: T
}

const WidgetClearButton = <T extends FieldValues>({
  defaultInitialValues,
}: WidgetClearButtonProps<T>) => {
  const form = useFormContext<T>()

  return (
    <Button
      variant="outline"
      size="1"
      color="gray"
      className="text-black"
      onClick={(e) => {
        e.preventDefault()
        form?.reset(defaultInitialValues)
      }}
    >
      Clear
    </Button>
  )
}

export { WidgetClearButton }
