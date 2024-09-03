'use client'

import { Button } from '@radix-ui/themes'
import { PrinterIcon } from 'lucide-react'

const NotesPrintButton = () => {
  return (
    <Button variant="outline" color="gray" size="1" className="text-black">
      <PrinterIcon height={14} width={14} strokeWidth={1.5} />
      Print
    </Button>
  )
}

export { NotesPrintButton }
