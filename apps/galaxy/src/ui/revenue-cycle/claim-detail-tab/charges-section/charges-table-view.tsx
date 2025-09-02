'use client'

import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { DataTable } from '@/components'
import { ClaimServiceLine } from '@/types'
import { columns as getColumns } from './table-columns'

const ChargesTableView = () => {
  const { watch } = useFormContext()
  const [claimServiceLines, claimDiagnosis] =
    watch(['claimServiceLines', 'claimDiagnosis']) ?? []

  const activeClaimServiceLines = claimServiceLines.filter(
    (charge: ClaimServiceLine) => charge.recordStatus !== 'Deleted',
  )

  const memoizedColumns = useMemo(
    () => getColumns(activeClaimServiceLines),
    [claimServiceLines, claimDiagnosis],
  )
  return <DataTable data={activeClaimServiceLines} columns={memoizedColumns} />
}

export { ChargesTableView }
