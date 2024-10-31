import React from 'react'
import { IconButton } from '@radix-ui/themes'
import CirclePlusIcon from '@/components/icons/circle-plus-icon'

interface AdjustmentAddProps {
  onClick: () => void
}
const AdjustmentAddButton = ({ onClick }: AdjustmentAddProps) => {
  return (
    <IconButton onClick={onClick} className="h-4 bg-transparent" type="submit">
      <CirclePlusIcon className="mx-1 cursor-pointer" />
    </IconButton>
  )
}

export { AdjustmentAddButton }
