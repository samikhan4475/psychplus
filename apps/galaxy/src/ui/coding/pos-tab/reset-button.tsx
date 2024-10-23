'use client'

import { Button } from '@radix-ui/themes'

const ResetButton = ({ onClear }: { onClear: () => void }) => {
  return (
    <Button
      color="gray"
      className="text-black"
      size="1"
      variant="outline"
      type="button"
      onClick={onClear}
    >
      Clear
    </Button>
  )
}

export { ResetButton }
