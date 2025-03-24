'use client'

import React from 'react'
import { PropsWithRow, TextCell } from '@/components'
import { Service } from '@/types'
import { BillingUsageType } from '../types'

const EhrCell = ({ row: { original } }: PropsWithRow<Service>) => {
  return (
    <TextCell className="truncate">
      {billingTypeMap[original?.billingUsageType as BillingUsageType] ?? 'N/A'}
    </TextCell>
  )
}
const billingTypeMap: Record<BillingUsageType, string> = {
  [BillingUsageType.EHRCoding]: 'EHR + Coding',
  [BillingUsageType.CodingOnly]: 'Coding Only',
}

export { EhrCell }
