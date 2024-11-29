'use client'

import { useState } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { columns } from './columns'
import { PharmacyDetailDialog } from './pharmacy-detail-dialog'
import { Pharmacy } from './types'

interface CurrentPharmaciesTableProps {
  data: Pharmacy[]
  loading?: boolean
}
const CurrentPharmaciesTable = ({
  data = [],
  loading,
}: CurrentPharmaciesTableProps) => {
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(
    null,
  )

  const handleRowClick = (pharmacy: Pharmacy) => {
    setSelectedPharmacy(pharmacy)
  }

  return (
    <ScrollArea className="bg-white min-h-[150px] max-w-[calc(100vw_-_198px)] p-2">
      {loading ? (
        <LoadingPlaceholder className="bg-white min-h-[46vh]" />
      ) : (
        <>
          <DataTable
            columns={columns}
            data={data}
            theadClass=""
            isRowSpan
            sticky
            onRowClick={(row) => handleRowClick(row.original)}
          />
          {selectedPharmacy && (
            <PharmacyDetailDialog
              isOpen={!!selectedPharmacy}
              onClose={() => setSelectedPharmacy(null)}
              pharmacy={selectedPharmacy}
            />
          )}
        </>
      )}
    </ScrollArea>
  )
}

export { CurrentPharmaciesTable }
