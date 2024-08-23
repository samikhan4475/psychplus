'use client'

import { Button } from '@radix-ui/themes'

const WidgetSaveButton = () => {
  return (
    <Button
      type="submit"
      variant="outline"
      size="1"
      color="gray"
      className="text-black"
    >
      Save
    </Button>
  )
}

export { WidgetSaveButton }
