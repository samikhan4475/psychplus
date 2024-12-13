'use client'

import { IconButton } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'

const ActionsCell = () => {
  const onDeleteRelation = async () => {}
  return (
    <IconButton
      size="1"
      variant="ghost"
      color="gray"
      onClick={onDeleteRelation}
    >
      <Trash2 width={16} height={16} className="text-pp-gray-1" />
    </IconButton>
  )
}
export { ActionsCell }
