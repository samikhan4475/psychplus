'use client'

import { useFormContext } from 'react-hook-form'
import { DataTable } from '@/components'
import { columns as getColumns } from './table-columns'
import { ClaimServiceLine } from '@/types'

const ChargesTableView = () => {
  const { watch } = useFormContext()
  const claimServiceLines = watch('claimServiceLines')
  const activeClaimServiceLines = claimServiceLines.filter((charge:ClaimServiceLine)=> charge.recordStatus !== 'Deleted')
  return <DataTable data={activeClaimServiceLines} columns={getColumns()} />
}

export { ChargesTableView }
