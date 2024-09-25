import React from 'react'
import { Button } from '@radix-ui/themes'

const SaveDraftButton = () => {
  return (
    <Button
      color="gray"
      className="w-[105px] rounded-[6px] p-0"
      variant="outline"
    >
      Save to Draft
    </Button>
  )
}

export { SaveDraftButton }
