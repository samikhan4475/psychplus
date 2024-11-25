'use client'

import { Button } from '@radix-ui/themes'

const SaveButton = () => (
  <Button
    type="submit"
    size="1"
    highContrast
    className="h-auto px-2 py-1 text-[11px] font-[300]"
  >
    Save
  </Button>
)

export { SaveButton }
