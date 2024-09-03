'use client'

import { Button } from '@radix-ui/themes'
import { WarningIcon } from '@/components/icons'

const NoteDetailMarkErrorButton = () => {
  return (
    <Button variant="outline" color="gray" size="1" className="text-black">
      <WarningIcon width={16} height={16} />
      Mark as Error
    </Button>
  )
}

export { NoteDetailMarkErrorButton }
