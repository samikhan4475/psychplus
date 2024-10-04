'use client'

import { Button, Tooltip } from '@radix-ui/themes'
import { EyeIcon } from '@/components/icons'

const ViewButton = () => {
  return (
    <Tooltip content="View">
      <Button
        variant="ghost"
        onClick={(e) => {
          e.preventDefault()
        }}
      >
        <EyeIcon height="16" width="16" />
      </Button>
    </Tooltip>
  )
}

export { ViewButton }
