'use client'

import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { createEmptyFormValues } from './mseDefaults'

const WidgetClearButton = () => {
  const form = useFormContext()

  return (
    <Button
      variant="outline"
      size="1"
      color="gray"
      className="text-black"
      onClick={(e) => {
        e.preventDefault()
        form?.reset({
          ...createEmptyFormValues(),
          widgetContainerCheckboxField: form.watch(
            'widgetContainerCheckboxField',
          ),
          shouldValidate: form.watch('shouldValidate'),
        })
      }}
    >
      Clear
    </Button>
  )
}

export { WidgetClearButton }
