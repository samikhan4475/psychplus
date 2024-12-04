'use client'

import { Button } from '@radix-ui/themes'
import { PrinterIcon } from 'lucide-react'
import { handlePrint } from '@/utils'

interface QuickNotesPrintButtonProps {
  id: string
}

const QuickNotesPrintButton = ({ id }: QuickNotesPrintButtonProps) => {
  return (
    <Button
      variant="outline"
      color="gray"
      size="1"
      className="text-black"
      onClick={() => handlePrint(id, 'Actual Note View')}
    >
      <PrinterIcon height={14} width={14} strokeWidth={1.5} />
      Print
    </Button>
  )
}

export { QuickNotesPrintButton }
