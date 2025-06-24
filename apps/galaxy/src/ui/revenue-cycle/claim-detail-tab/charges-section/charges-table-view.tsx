'use client'

import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { DataTable } from '@/components'
import { ClaimServiceLine } from '@/types'
import { columns as getColumns } from './table-columns'

const ChargesTableView = () => {
  const { watch } = useFormContext()
  const claimServiceLines = watch('claimServiceLines')

  const activeClaimServiceLines = claimServiceLines.filter(
    (charge: ClaimServiceLine) => charge.recordStatus !== 'Deleted',
  )

  const memoizedColumns = useMemo(() => getColumns(activeClaimServiceLines), [claimServiceLines])
  return <DataTable data={activeClaimServiceLines} columns={memoizedColumns} />
}

export { ChargesTableView }
