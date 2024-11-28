'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { DataTable } from '@/components'
import { ClaimServiceLine, StaffResource } from '@/types'
import { getStaffActions } from '../actions/get-service-staff'
import { columns as getColumns } from './table-columns'

const ChargesTableView = () => {
  const { watch } = useFormContext()
  const claimServiceLines = watch('claimServiceLines')
  const renderingProviderId = watch('renderingProviderId')
  const activeClaimServiceLines = claimServiceLines.filter(
    (charge: ClaimServiceLine) => charge.recordStatus !== 'Deleted',
  )

  const [staffData, setStaffData] = useState<StaffResource>()

  useEffect(() => {
    const fetchStaff = async () => {
      const data = await getStaffActions()
      if (data.state === 'success') {
        setStaffData(
          data.data?.find(
            (staff) => staff.id.toString() == renderingProviderId?.toString(),
          ),
        )
      }
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
