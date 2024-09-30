'use client'

import { Phone } from 'lucide-react'
import { RowActionProps } from '../types'
import { ActionItem } from './action-item'

const RowActionCall = ({ row, id, disabled }: RowActionProps) => {
  return <ActionItem Icon={Phone} title={id} disabled={disabled} />
}

export { RowActionCall }
