'use client'

import { IconButton } from '@radix-ui/themes'
import { type PropsWithRow } from '@/components'
import { Mail2Icon } from '@/components/icons'
import { Staff } from '../staff-management/types'

const RowActionMail = ({ row: { original: record } }: PropsWithRow<Staff>) => {
  const onClick = () => {
    // will be implemented here
  }
  return (
    <IconButton size="1" color="gray" variant="ghost" onClick={onClick}>
      <Mail2Icon className="text-black" />
    </IconButton>
  )
}

export { RowActionMail }
