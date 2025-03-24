'use client'

import { useFormContext } from 'react-hook-form'
import { DataTable } from '@/components'
import { ClaimAddSchemaType } from '../schema'
import { columns as getColumns } from './columns'
import { useMemo } from 'react'

const ChargesTable = () => {
  const { watch } = useFormContext<ClaimAddSchemaType>()
  const claimServiceLines = watch('claimServiceLines')

  const columns = useMemo(() => getColumns(claimServiceLines), [claimServiceLines])

  return (
    <DataTable
      data={claimServiceLines}
      columns={columns}
    />
  )
}

export { ChargesTable }
