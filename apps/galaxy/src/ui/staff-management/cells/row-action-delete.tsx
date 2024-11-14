'use client'

import { TrashIcon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import { type PropsWithRow } from '@/components'
import { Staff } from '../types'

const RowActionDelete = ({
  row: { original: record },
}: PropsWithRow<Staff>) => {
  const deleteRecord = async () => {
    //  TODO: NEED IMPLEMENTATION
  }

  return (
    <IconButton onClick={deleteRecord} size="1" color="gray" variant="ghost">
      <TrashIcon width={16} height={16} className="text-pp-gray-1" />
    </IconButton>
  )
}

export { RowActionDelete }
