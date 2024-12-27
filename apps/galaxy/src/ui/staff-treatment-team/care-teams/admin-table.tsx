'use client'

import { ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { columns } from './admin-columns'
import { AdminHeader } from './admin-header'
import { useStore } from './store'

const AdminTable = () => {
  const { adminData, loadingadmin } = useStore()

  return (
    <ScrollArea className="bg-white min-h-[150px] max-w-[calc(100vw_-_198px)] p-2">
      <AdminHeader />
      {loadingadmin ? (
        <LoadingPlaceholder className="bg-white min-h-[46vh]" />
      ) : (
        <DataTable
          columns={columns}
          data={adminData}
          tdClass="!p-0"
          isRowSpan
          sticky
          disablePagination
          tableRowClass="border-b border-red-200"
        />
      )}
    </ScrollArea>
  )
}

export { AdminTable }
