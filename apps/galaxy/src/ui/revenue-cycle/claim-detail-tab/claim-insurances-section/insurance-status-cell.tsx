'use client'

import React from 'react'
import { Row } from '@tanstack/react-table'
import { TextCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { InsuranceClaimPolicy } from '@/types'
import { getClaimStatusDisplay } from '../../utils'

interface InsuranceStatusColumnProps {
  row: Row<InsuranceClaimPolicy>
}
const InsuranceStatusColumnCell = ({ row }: InsuranceStatusColumnProps) => {
  const claimStatuses = useCodesetCodes(CODESETS.ClaimStatus)
  const statusCode = row.original?.claimStatus
  const claimStatus = statusCode
    ? getClaimStatusDisplay(claimStatuses, statusCode)
    : statusCode
  return <TextCell>{claimStatus}</TextCell>
}

export { InsuranceStatusColumnCell }
