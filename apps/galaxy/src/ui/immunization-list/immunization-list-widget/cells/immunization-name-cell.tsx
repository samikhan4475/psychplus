import React from 'react'
import type { CellContext } from '@tanstack/react-table'
import { LongTextCell } from '@/components'
import { useCodesetCodes } from '@/hooks'
import { getCodesetDisplayName } from '@/utils/codes'
import { ImmunizationDataResponse } from '../types'

const ImmunizationNameCell = ({
  row,
}: CellContext<ImmunizationDataResponse, unknown>) => {
  const { cvxCode, immunization_name } = row.original
  const cvxCodes = useCodesetCodes('CVX')
  const immunizationName = getCodesetDisplayName(cvxCode || '', cvxCodes)

  return (
    <LongTextCell>{immunizationName || immunization_name || '-'}</LongTextCell>
  )
}

export { ImmunizationNameCell }
