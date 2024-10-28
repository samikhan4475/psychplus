'use client'

import { IconButton } from '@radix-ui/themes'
import { ExpandIcon } from './expand-icon'

const ExpandButton = () => {
  return (
    <IconButton size="1" color="gray" variant="ghost">
      <ExpandIcon />
    </IconButton>
  )
}

export { ExpandButton }
