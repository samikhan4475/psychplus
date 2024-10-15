'use client'

import { TrashIcon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import { Trash2Icon } from 'lucide-react'
import { type PropsWithRow } from '@/components'
import { Appointment } from '@/types'

const RowActionDelete = ({
  row: { original: record },
}: PropsWithRow<Appointment>) => {
  return (
    <IconButton size="1" color="gray" variant="ghost">
      <Trash2Icon color="black" height="14" width="14" />
    </IconButton>
  )
}

export { RowActionDelete }
