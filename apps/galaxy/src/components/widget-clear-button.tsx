'use client'

import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'

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
        form?.reset()
      }}
    >
      Clear
    </Button>
  )
}

export { WidgetClearButton }
