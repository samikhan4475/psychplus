'use client'

import { TrashIcon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import { type PropsWithRow } from '@/components'
import { CPT } from '../../types'

const RowActionDelete = ({ row: { original: cpt } }: PropsWithRow<CPT>) => {

  const deleteRecord = async () => {
    //  TODO: need to implement the deleting record
  }

  return (
    <IconButton onClick={deleteRecord} size="1" color="gray" variant="ghost">
      <TrashIcon width={16} height={16} className="text-pp-gray-1" />
    </IconButton>
  )
}

export { RowActionDelete }
