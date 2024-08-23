'use client'

import { Button } from '@radix-ui/themes'

const WidgetHxButton = () => {
  return (
    <Button
      variant="outline"
      size="1"
      color="gray"
      className="text-black"
      onClick={(e) => {
        e.preventDefault()
      }}
    >
      Hx
    </Button>
  )
}

export { WidgetHxButton }
