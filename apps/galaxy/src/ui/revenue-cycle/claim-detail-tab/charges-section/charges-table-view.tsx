'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { DataTable } from '@/components'
import { ClaimServiceLine, StaffResource } from '@/types'
import { useRevCycleDataProvider } from '../../revCycleContext'
import { columns as getColumns } from './table-columns'

const ChargesTableView = () => {
  const { watch } = useFormContext()
  const claimServiceLines = watch('claimServiceLines')
  const renderingProviderId = watch('renderingProviderId')
  const activeClaimServiceLines = claimServiceLines.filter(
    (charge: ClaimServiceLine) => charge.recordStatus !== 'Deleted',
  )

  const [staffData, setStaffData] = useState<StaffResource>()
  const { selectedStaffData } = useRevCycleDataProvider()

  useEffect(() => {
    const fetchStaff = async () => {
      if (!renderingProviderId) return
      setStaffData(
        selectedStaffData?.find(
          (staff) => staff.id.toString() === renderingProviderId?.toString(),
        ),
      )
    }

    fetchStaff()
  }, [renderingProviderId])

  return (
    <DataTable
      data={activeClaimServiceLines}
      columns={getColumns(activeClaimServiceLines, staffData)}
    />
  )
}

export { ChargesTableView }
