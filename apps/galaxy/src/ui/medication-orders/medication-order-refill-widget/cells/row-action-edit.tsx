'use client'

import { IconButton } from '@radix-ui/themes'
import { SignIcon } from '@/components/icons'

const RowActionEdit = () => {
  return (
    <IconButton size="1" color="gray" variant="ghost">
      <SignIcon />
    </IconButton>
  )
}

export { RowActionEdit }
