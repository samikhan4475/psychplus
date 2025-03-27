'use client'

import { type PropsWithRow } from '@/components'
import { SignIcon } from '@/components/icons'
import { IconButton } from '@radix-ui/themes'
import { Edit2Icon } from 'lucide-react'

const RowActionEdit = () => {
  return (
    <IconButton size="1" color="gray" variant="ghost">
      <SignIcon />
    </IconButton>
  )
}

export { RowActionEdit }
