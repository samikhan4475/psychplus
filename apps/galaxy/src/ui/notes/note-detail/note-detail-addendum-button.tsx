'use client'

import { PlusIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'

interface AddendumButtonProps {
  onClick: () => void
}
const NoteDetailAddendumButton = ({ onClick }: AddendumButtonProps) => {
  return (
    <Button
      variant="outline"
      color="gray"
      size="1"
      className="text-black"
      onClick={onClick}
    >
      <PlusIcon className="text-pp-gray-3" width={16} height={16} />
      Addendum
    </Button>
  )
}

export { NoteDetailAddendumButton }
