'use client'

import { Button } from '@radix-ui/themes'
import { PrinterIcon } from 'lucide-react'

interface PrintButtonProps {
  onClick?: () => void
}
const PrintButton = ({ onClick }: PrintButtonProps) => {
  return (
    <Button
      variant="outline"
      color="gray"
      size="1"
      className="text-black/80 disabled:text-gray-8"
      onClick={onClick}
    >
      <PrinterIcon size={14} />
      Print
    </Button>
  )
}

export { PrintButton }
