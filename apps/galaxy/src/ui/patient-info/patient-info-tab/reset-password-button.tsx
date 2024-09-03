'use client'

import { Button } from '@radix-ui/themes'
import { RefreshCwIcon } from 'lucide-react'

const ResetPasswordButton = () => {

  return (
    <Button
      size="1"
      color="gray"
      variant="surface"
      highContrast
      onClick={() => {}}
      className="h-auto px-1 py-1 text-[11px] font-[300]"
    >
      <RefreshCwIcon width={15} height={15} strokeWidth={1.75} />
      Reset Password
    </Button>
  )
}

export { ResetPasswordButton }
