'use client'

import { Pencil1Icon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import { type PropsWithRow } from '@/components'
import { AddPlanAddressDialog } from '../dialogs'
import { PracticePlanAddress } from '../types'

const RowActionEdit = ({ row }: PropsWithRow<PracticePlanAddress>) => {
  return (
    <AddPlanAddressDialog row={row}>
      <IconButton size="1" color="gray" variant="ghost">
        <Pencil1Icon width={16} height={16} className="text-pp-gray-1" />
      </IconButton>
    </AddPlanAddressDialog>
  )
}

export { RowActionEdit }
