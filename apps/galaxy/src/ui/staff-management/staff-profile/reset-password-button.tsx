import React from 'react'
import { Button } from '@radix-ui/themes'
import { RefreshCwIcon } from 'lucide-react'

const ResetPasswordButton = () => {
  const onReset = () => {
    // Todo: need implementation for reset
  }
  return (
    <Button
      size="1"
      color="gray"
      variant="surface"
      type="button"
      highContrast
      onClick={onReset}
      className="mt-auto h-fit p-1 text-[11px] font-[600]"
    >
      <RefreshCwIcon width={15} height={15} strokeWidth={1.75} />
      Reset
    </Button>
  )
}

export { ResetPasswordButton }
