import React from 'react'
import { Button } from '@radix-ui/themes'

const SaveDraftButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      type="submit"
      onClick={onClick}
      color="gray"
      className="disabled:text-pp-text-primary-base w-[105px] rounded-[6px] p-0"
      variant="outline"
    >
      Save to Draft
    </Button>
  )
}

export { SaveDraftButton }
