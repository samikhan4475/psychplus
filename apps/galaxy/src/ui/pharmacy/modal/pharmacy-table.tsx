'use client'

import { ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { useStore } from '../store'
import { columns } from './column'

const PharmacyTable = () => {
  const { pharmacies, modalLoading } = useStore()

  return (
    <ScrollArea
      className="rounded-2 pt-2"
      style={{ maxHeight: '300px', width: '918px' }}
    >
      {modalLoading ? (
        <LoadingPlaceholder className="bg-white min-h-[46vh]" />
      ) : (
        <DataTable
          columns={columns}
          data={pharmacies ?? []}
          disablePagination
          sticky
        />
      )}
    </ScrollArea>
  )
}

export { PharmacyTable }
