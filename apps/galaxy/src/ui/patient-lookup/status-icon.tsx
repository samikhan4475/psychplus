'use client'

import { TextCell } from '@/components'

interface StatusIconProps {
  status?: string
}

const statuses: Record<string, string> = {
  Verified: 'Yes',
  Pending: 'Pending',
  Unverifiable: 'No',
}

const StatusIcon = ({ status = '' }: StatusIconProps) => (
  <TextCell>{statuses?.[status]}</TextCell>
)

export { StatusIcon }
