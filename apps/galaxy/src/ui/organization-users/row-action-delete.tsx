'use client'

import { type PropsWithRow } from '@/components'
import { TrashIcon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import { Users } from './types'
import { DeleteIcon } from '@/components/icons'

const RowActionDelete = ({
  row: { original: record },
}: PropsWithRow<Users>) => {

  return (
    <IconButton size="1" color="gray" variant="ghost">
      <DeleteIcon width={16} height={16} className="text-pp-gray-1" />
    </IconButton>
  )
}

export { RowActionDelete }
