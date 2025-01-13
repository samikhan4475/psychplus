'use client'

import { Button } from '@radix-ui/themes'
import { PrinterIcon } from 'lucide-react'
import { handlePrint } from '@/utils'

const CreateNotePrintButton = ({ id }: { id: string }) => {
  const onClick = () => {
    handlePrint(id, 'Create Note')
  }
  return (
    <Button
      variant="outline"
      color="gray"
      size="1"
      className="text-black"
      type="button"
      onClick={onClick}
    >
      <PrinterIcon height={14} width={14} strokeWidth={1.5} />
      Print
    </Button>
  )
}

export { CreateNotePrintButton }
