'use client'

import { Button } from '@radix-ui/themes'
import { SaveIcon } from 'lucide-react'

const SaveButton = () => (
  <Button
    type="submit"
    size="1"
    highContrast
    className="h-auto px-1 py-1 text-[11px] font-[300]"
  >
    <SaveIcon width={15} height={15} strokeWidth={1.75} />
    Save
  </Button>
)

export { SaveButton }
