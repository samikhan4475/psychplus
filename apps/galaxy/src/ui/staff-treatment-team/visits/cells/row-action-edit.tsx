'use client'

import { IconButton } from '@radix-ui/themes'
import { Edit2Icon } from '@/components/icons'

const RowActionEdit = () => {
  return (
    <IconButton size="1" color="gray" variant="ghost">
      <Edit2Icon fill={'black'} />
    </IconButton>
  )
}

export { RowActionEdit }
