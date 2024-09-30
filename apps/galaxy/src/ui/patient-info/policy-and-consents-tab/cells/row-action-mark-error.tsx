'use client'

import { CircleAlert } from 'lucide-react'
import { RowActionProps } from '../types'
import { ActionItem } from './action-item'

const RowActionMarkError = ({ id, disabled }: RowActionProps) => {
  return <ActionItem Icon={CircleAlert} title={id} disabled={disabled} />
}

export { RowActionMarkError }
