'use client'

import { Pencil1Icon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import { type PropsWithRow } from '@/components'
import { ClaimPayment } from '../types'

const RowActionEdit = ({
  row: { original: payment },
}: PropsWithRow<ClaimPayment>) => {
  const onEdit = () => {
    //  TODO: NEED TO IMPLEMENT EDIT
  }

  return (
    <IconButton size="1" color="gray" variant="ghost" onClick={onEdit}>
      <Pencil1Icon width={16} height={16} className="text-pp-gray-1" />
    </IconButton>
  )
}

export { RowActionEdit }
