'use client'

import { Pencil1Icon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import { type PropsWithRow } from '@/components'
import { AddMasterFeeScheduleDialog } from '../../dialogs'
import { CPT } from '../../types'

const RowActionEdit = ({ row: { original: cpt } }: PropsWithRow<CPT>) => {
  return (
    <AddMasterFeeScheduleDialog cpt={cpt}>
      <IconButton size="1" color="gray" variant="ghost">
        <Pencil1Icon width={16} height={16} className="text-pp-gray-1" />
      </IconButton>
    </AddMasterFeeScheduleDialog>
  )
}

export { RowActionEdit }
