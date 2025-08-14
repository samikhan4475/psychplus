'use client'

import { Pencil1Icon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import { SaveIcon } from 'lucide-react'
import { type PropsWithRow } from '@/components'
import { FeeSchedule } from './types'

const RowActionEdit = ({
  row: { original: record },
}: PropsWithRow<FeeSchedule>) => {
  return (
    <IconButton size="1" color="gray" variant="ghost">
      {!record.edit ? (
        <Pencil1Icon width={16} height={16} className="text-pp-gray-1" />
      ) : (
        <SaveIcon width={16} height={16} className="text-pp-gray-1" />
      )}
    </IconButton>
  )
}

export { RowActionEdit }
