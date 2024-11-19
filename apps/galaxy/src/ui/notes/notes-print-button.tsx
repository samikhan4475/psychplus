'use client'

import { Button } from '@radix-ui/themes'
import { PrinterIcon } from 'lucide-react'
import { handlePrint } from '@/utils'

interface NotesPrintButtonProps {
  id: string
}

const NotesPrintButton = ({ id }: NotesPrintButtonProps) => {
  return (
    <Button
      variant="outline"
      color="gray"
      size="1"
      className="text-black"
      onClick={() => handlePrint(id)}
    >
      <PrinterIcon height={14} width={14} strokeWidth={1.5} />
    </Button>
  )
}

export { NotesPrintButton }
