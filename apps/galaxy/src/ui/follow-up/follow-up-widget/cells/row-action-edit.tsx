'use client'

import { Pencil1Icon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import { type PropsWithRow } from '@/components'
import { Edit2Icon, EditIcon } from '@/components/icons'
import { Appointment } from '@/types'

const RowActionEdit = ({
  row: { original: record },
}: PropsWithRow<Appointment>) => {
  const onEdit = () => {
    // modal open code
  }

  return (
    <IconButton size="1" color="gray" variant="ghost" onClick={onEdit}>
      <Edit2Icon width={16} height={16} className="text-pp-gray-1" />
    </IconButton>
  )
}

export { RowActionEdit }
