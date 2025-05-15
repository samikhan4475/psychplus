'use client'

import { ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { ClinicalStaffHeader } from './clinical-staff-header'
import { columns } from './columns'
import { useStore } from './store'

const ClinicalSupportStaffTable = ({
  isProfileView,
  staffId,
  setAlertInfo,
}: {
  isProfileView?: boolean
  staffId: string
  setAlertInfo: ({
    message,
    isOpen,
  }: {
    message: string
    isOpen: boolean
  }) => void
}) => {
  const { clinicalStaffData, loadingClinicalStaff } = useStore((state) => ({
    clinicalStaffData: state.clinicalStaffData,
    loadingClinicalStaff: state.loadingClinicalStaff,
  }))
  const heading = 'Clinical Support Staff'

  return (
    <ScrollArea className="bg-white min-h-[150px] max-w-[calc(100vw_-_198px)] p-2">
      <ClinicalStaffHeader staffId={staffId} setAlertInfo={setAlertInfo} />
      {loadingClinicalStaff ? (
        <LoadingPlaceholder className="bg-white min-h-[46vh]" />
      ) : (
        <DataTable
          columns={columns(heading, staffId, setAlertInfo, isProfileView)}
          data={clinicalStaffData}
          tdClass="!py-0 pr-0"
          isRowSpan
          sticky
          disablePagination
          tableRowClass="border-b border-red-200"
          tableClass="w-[90%] sm:w-[80%] md:w-[50%]"
          defaultSorting={[{ id: 'added-on', desc: true }]}
        />
      )}
    </ScrollArea>
  )
}

export { ClinicalSupportStaffTable }
