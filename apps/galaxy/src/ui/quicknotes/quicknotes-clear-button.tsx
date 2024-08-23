'use client'

import { Button } from '@radix-ui/themes'

const QuickNotesClearButton = () => {
  return (
    <Button
      onClick={() => {
        window.postMessage({ type: 'quicknotes:clear' }, '*')
      }}
      variant="outline"
      color="gray"
      size="1"
      className="text-black"
    >
      Clear
    </Button>
  )
}

export { QuickNotesClearButton }
