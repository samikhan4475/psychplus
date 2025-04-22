'use client'

import { IconButton } from '@radix-ui/themes'
import { type PropsWithRow } from '@/components'
import { Edit2Icon } from '@/components/icons'
import { Staff } from '../staff-management/types'


const RowActionEdit = ({ row }: PropsWithRow<Staff>) => {
  const onClick = () => {
    // will be implemented here
  }

  return (
    <IconButton size="1" color="gray" variant="ghost" onClick={onClick}>
      <Edit2Icon width={16} height={16} />
    </IconButton>
  )
}

export { RowActionEdit }
