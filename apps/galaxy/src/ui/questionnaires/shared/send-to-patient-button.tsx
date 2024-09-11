'use client'

import { Button } from '@radix-ui/themes'
import { SendHorizonalIcon } from 'lucide-react'

const SendToPatientButton = () => {
  return (
    <Button
      size="1"
      color="gray"
      variant="surface"
      highContrast
      className="h-auto px-1 py-1 text-[11px] font-[300]"
    >
      <SendHorizonalIcon width={15} height={15} strokeWidth={1.75} />
      Send to Patient
    </Button>
  )
}

export { SendToPatientButton }
