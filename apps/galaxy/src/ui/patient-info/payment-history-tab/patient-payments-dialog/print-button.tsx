'use client'

import { Button } from '@radix-ui/themes'
import { PrinterIcon } from 'lucide-react'

const PrintButton = () => {
  return (
    <Button variant="outline" color="gray" size="1" className="text-black/80">
      <PrinterIcon size={14} />
      Print
    </Button>
  )
}

export { PrintButton }
