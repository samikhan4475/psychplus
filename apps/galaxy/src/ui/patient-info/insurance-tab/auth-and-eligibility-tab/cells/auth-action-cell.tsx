'use client'

import { useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import { DeleteDialog } from '../../dialogs'

const AuthActionCell = () => {
  const [open, setOpen] = useState(false)
  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)
  return (
    <Flex justify="center" width="100%">
      <Trash2
        width={14}
        height={14}
        onClick={onOpen}
        className="cursor-pointer"
      />
      <DeleteDialog open={open} onClose={onClose} />
    </Flex>
  )
}

export { AuthActionCell }
