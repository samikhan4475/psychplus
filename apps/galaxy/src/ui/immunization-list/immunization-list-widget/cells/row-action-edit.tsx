'use client'

import { IconButton, Tooltip } from '@radix-ui/themes'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { type PropsWithRow } from '@/components'
import { ImmunizationDataResponse } from '../types'
import { useStore } from '../store/store'

const RowActionEdit = ({
  row: { original: record },
}: PropsWithRow<ImmunizationDataResponse>) => {
  const { setEditData, setDialogOpen, setDialogType } = useStore()

  const handleEditClick = () => {
    setEditData(record)
    setDialogType(record.entryType)
    setDialogOpen(true)
  }

  return (
    <Tooltip content="Edit">
      <IconButton
        size="1"
        color="gray"
        variant="ghost"
        onClick={handleEditClick}
      >
        <Pencil1Icon />
      </IconButton>
    </Tooltip>
  )
}

export { RowActionEdit } 