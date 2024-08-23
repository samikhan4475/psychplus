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
import { useStore } from './store'
import type { Patient } from './types'

const columns: ColumnDef<Patient>[] = [
  {
    id: 'patient-last-name',
    header: () => <ColumnHeader label="Last" />,
    cell: ({ row }) => {
      return <LongTextCell>{row.original.lastName}</LongTextCell>
    },
  },
  {
    id: 'patient-first-name',
    header: () => <ColumnHeader label="First" />,
    cell: ({ row }) => {
      return <LongTextCell>{row.original.firstName}</LongTextCell>
    },
  },
  {
    id: 'patient-age',
    header: () => <ColumnHeader label="Age" />,
    cell: ({ row }) => {
      return <TextCell>{row.original.age}</TextCell>
    },
  },
  {
    id: 'patient-gender',
    header: () => <ColumnHeader label="Gender" />,
    cell: ({ row }) => {
      return <TextCell>{row.original.gender}</TextCell>
    },
  },
  {
    id: 'patient-mrn',
    header: () => <ColumnHeader label="MRN" />,
    cell: ({ row }) => {
      return <TextCell>{row.original.mrn}</TextCell>
    },
  },
  {
    id: 'patient-dob',
    header: () => <ColumnHeader label="DOB" />,
    cell: ({ row }) => {
      return <TextCell>{row.original.dob}</TextCell>
    },
  },
]

const PatientLookupTable = () => {
  const router = useRouter()

  const addTab = useRootStore((state) => state.addTab)

  const { data, loading } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
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
        columns={columns}
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
