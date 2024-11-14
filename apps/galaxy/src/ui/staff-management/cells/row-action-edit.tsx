'use client'

import { Pencil1Icon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import { type PropsWithRow } from '@/components'
import { Staff } from '../types'

const RowActionEdit = ({ row: { original: record } }: PropsWithRow<Staff>) => {
  return (
    <IconButton size="1" color="gray" variant="ghost">
      <Pencil1Icon width={16} height={16} className="text-pp-gray-1" />
    </IconButton>
  )
}

export { RowActionEdit }
