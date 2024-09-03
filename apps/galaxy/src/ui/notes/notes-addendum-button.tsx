'use client'

import { PlusIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'

const NotesAddendumButton = () => {
  return (
    <Button variant="outline" color="gray" size="1" className="text-black">
      <PlusIcon className="text-pp-gray-3" width={16} height={16} />
      Addendum
    </Button>
  )
}

export { NotesAddendumButton }
