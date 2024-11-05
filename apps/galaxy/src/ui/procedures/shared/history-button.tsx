'use client'

import { Button } from '@radix-ui/themes'
import { HistoryIcon } from 'lucide-react'

const HistoryButton = () => {
  return (
    <Button
      size="1"
      color="gray"
      variant="surface"
      highContrast
      className="h-auto px-1 py-1 text-[11px] font-[300]"
      onClick={(e) => {
        e.preventDefault()
      }}
    >
      Hx
    </Button>
  )
}

export { HistoryButton }
