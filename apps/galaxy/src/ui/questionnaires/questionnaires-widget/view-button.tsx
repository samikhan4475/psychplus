'use client'

import { Button } from '@radix-ui/themes'
import { EyeIcon } from '@/components/icons'

const ViewButton = () => {
  return (
    <Button
      variant="ghost"
      onClick={(e) => {
        e.preventDefault()
      }}
    >
      <EyeIcon />
    </Button>
  )
}

export { ViewButton }
