'use client'

import { useFormContext } from 'react-hook-form'
import { DataTable } from '@/components'
import { columns as getColumns } from './table-columns'

const ChargesTableView = () => {
  const { watch } = useFormContext()
  const claimServiceLines = watch('claimServiceLines')
  return <DataTable data={claimServiceLines} columns={getColumns()} />
}

export { ChargesTableView }
