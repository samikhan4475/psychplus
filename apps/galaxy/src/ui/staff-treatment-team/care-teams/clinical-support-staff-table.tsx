'use client'

import { ScrollArea } from '@radix-ui/themes'
import { DataTable } from '@/components'
import { useStore } from '../store'
import { ClinicalStaffHeader } from './clinical-staff-header'
import { columns } from './clinical-support-staff-column'

const ClinicalSupportStaffTable = () => {
  const { clinicalStaffData } = useStore()

  return (
    <ScrollArea className="bg-white min-h-[150px] max-w-[calc(100vw_-_198px)] p-2">
      <ClinicalStaffHeader />
      <DataTable
        columns={columns}
        data={clinicalStaffData}
        tdClass="!p-0"
        isRowSpan
        sticky
        disablePagination
        tableRowClass="border-b border-red-200"
      />
    </ScrollArea>
  )
}

export { ClinicalSupportStaffTable }
