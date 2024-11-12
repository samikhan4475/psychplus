'use client'

import { Button } from '@radix-ui/themes'

const CancelButton = ({ onCancel }: { onCancel: () => void }) => {
  return (
    <Button
      color="gray"
      className="text-black"
      size="1"
      variant="outline"
      type="button"
      onClick={onCancel}
    >
      Cancel
    </Button>
  )
}

export { CancelButton }
