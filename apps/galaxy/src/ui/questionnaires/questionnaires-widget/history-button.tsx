'use client'

import { Button, Tooltip } from '@radix-ui/themes'
import { HistoryIcon } from 'lucide-react'

const HistoryButton = () => {
  return (
    <Tooltip content="History">
      <Button
        variant="ghost"
        onClick={(e) => {
          e.preventDefault()
        }}
      >
        <HistoryIcon color="black" height="16" width="16" />
      </Button>
    </Tooltip>
  )
}

export { HistoryButton }
