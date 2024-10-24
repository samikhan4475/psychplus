import React from 'react'
import { Button } from '@radix-ui/themes'

const SendButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      onClick={onClick}
      type="submit"
      className="bg-pp-text-primary-base disabled:text-white w-[96px] rounded-[6px]"
    >
      Send
    </Button>
  )
}

export { SendButton }
