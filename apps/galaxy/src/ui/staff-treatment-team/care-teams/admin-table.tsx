'use client'

import { Flex } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { AdminHeader } from './admin-header'
import { columns } from './columns'
import { useStore } from './store'

const AdminTable = ({
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
  const { adminData, loadingAdmin } = useStore((state) => ({
    adminData: state.adminData,
    loadingAdmin: state.loadingAdmin,
  }))
  const heading = 'Admin Name'
  return (
    <Flex
      direction="column"
      className="bg-white flex-1 overflow-visible"
      p="2"
      gap="1"
    >
      <AdminHeader staffId={staffId} setAlertInfo={setAlertInfo} />
      {loadingAdmin ? (
        <LoadingPlaceholder className="bg-white min-h-[46vh]" />
      ) : (
        <DataTable
          columns={columns(heading, staffId, setAlertInfo, isProfileView)}
          data={adminData}
          tdClass="!py-0 pr-0"
          isRowSpan
          sticky
          disablePagination
          tableRowClass="border-b border-red-200"
          tableClass="w-[90%] sm:w-[80%] md:w-[50%]"
          defaultSorting={[{ id: 'added-on', desc: true }]}
        />
      )}
    </Flex>
  )
}

export { AdminTable }
