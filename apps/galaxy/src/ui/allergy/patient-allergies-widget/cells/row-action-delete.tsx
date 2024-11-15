'use client'

import { Trash2Icon } from 'lucide-react'
import { ActionItem } from './action-item'

interface RowActionDeleteProps {
  id: string
}
const RowActionDelete = ({ id }: RowActionDeleteProps) => {
  return <ActionItem Icon={Trash2Icon} title={id} />
}

export { RowActionDelete }
