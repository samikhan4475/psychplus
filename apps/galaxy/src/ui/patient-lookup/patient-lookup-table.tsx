'use client'

import { useRouter } from 'next/navigation'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Flex, ScrollArea, Text } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  LongTextCell,
  TextCell,
} from '@/components'
import { useStore as useRootStore } from '@/store'
import { Sort } from '@/types'
import { getSortDir } from '@/utils'
import { useStore } from './store'
import type { Patient } from './types'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<Patient>[] => {
  return [
    {
      id: 'legalName',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          column={column}
          label="Name"
        />
      ),
      cell: ({ row }) => {
        return (
          <LongTextCell>{`${row.original.firstName} ${row.original.lastName}`}</LongTextCell>
        )
      },
    },
    {
      id: 'patient-age',
      header: ({ column }) => <ColumnHeader label="Age" column={column} />,
      cell: ({ row }) => {
        return <TextCell>{row.original.age}</TextCell>
      },
    },
    {
      id: 'patient-gender',
      header: ({ column }) => <ColumnHeader label="Gender" />,
      cell: ({ row }) => {
        return <TextCell>{row.original.gender}</TextCell>
      },
    },
    {
      id: 'patient-mrn',
      header: ({ column }) => <ColumnHeader label="MRN" />,
      cell: ({ row }) => {
        return <TextCell>{row.original.mrn}</TextCell>
      },
    },
    {
      id: 'patient-dob',
      header: ({ column }) => <ColumnHeader label="DOB" />,
      cell: ({ row }) => {
        return <TextCell>{row.original.dob}</TextCell>
      },
    },
  ]
}

const PatientLookupTable = () => {
  const router = useRouter()

  const addTab = useRootStore((state) => state.addTab)

  const { data, loading, sort, sortData } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    sort: state.sort,
    sortData: state.sortData,
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
    <ScrollArea>
      <DataTable
        data={data.patients}
        columns={columns(sort, sortData)}
        onRowClick={(row) => {
          const href = `/chart/${row.original.id}`

          addTab({
            href,
            label: `${row.original.firstName} ${row.original.lastName}`,
          })

          router.push(href)
        }}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { PatientLookupTable }
