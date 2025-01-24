'use client'

import { useRouter } from 'next/navigation'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Flex, ScrollArea, Text } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { useStore as useRootStore } from '@/store'
import { columns } from './columns'
import { useStore } from './store'

const PatientLookupTable = () => {
  const router = useRouter()

  const addTab = useRootStore((state) => state.addTab)

  const { data, loading, showFilters } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    sort: state.sort,
    sortData: state.sortData,
    showFilters: state.showFilters,
  }))

  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  if (!data) {
    return (
      <Flex height="100%" align="center" justify="center">
        <Text
          weight="light"
          className="flex items-center gap-2 text-[14px] text-gray-10"
        >
          <MagnifyingGlassIcon width={18} height={18} />
          Use the form to search for a patient
        </Text>
      </Flex>
    )
  }
  return (
    <ScrollArea scrollbars="both" className="bg-white h-full flex-1 px-4 py-2">
      <DataTable
        data={data.patients}
        columns={columns}
        onRowClick={(row) => {
          const href = `/chart/${row.original.id}/scheduling-history`
          addTab({
            href,
            label: `${row.original?.legalName?.firstName} ${row.original.legalName?.lastName}-${row.original.medicalRecordNumber}`,
          })
          router.push(href)
        }}
        tdClass="[&:has(.dialog-trigger-cell)]:!p-0"
        tableClass="[&_.rt-ScrollAreaScrollbar]:!hidden"
        theadClass="z-[1]"
        initialPageSize={!showFilters ? 20 : 30}
        isRowSpan
        sticky
      />
    </ScrollArea>
  )
}

export { PatientLookupTable }
