'use client'

import { useEffect } from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  LoadingPlaceholder,
  DataTable as Table,
  TextCell,
} from '@/components'
import { ActionsCell, StatusCell } from './cells'
import { FilterForm } from './filter-form'
import { useStore } from './store'
import { type PolicyConsents } from './types'

const columns: ColumnDef<PolicyConsents>[] = [
  {
    id: 'policy-description',
    accessorKey: 'policyDescription',
    header: () => (
      <ColumnHeader
        label="Policy Description"
        className="px-1 py-0.5 !text-1 !font-medium"
      />
    ),
    cell: ({ row }) => (
      <TextCell className="px-1 py-0.5 !text-1">
        {row.original.policyDescription}
      </TextCell>
    ),
  },
  {
    id: 'policy-type',
    accessorKey: 'policyType',
    header: () => (
      <ColumnHeader
        label="Policy Type"
        className="px-1 py-0.5 !text-1 !font-medium"
      />
    ),
    cell: ({ row }) => (
      <TextCell className="px-1 py-0.5 !text-1">
        {row.original.policyType}
      </TextCell>
    ),
  },
  {
    id: 'organization-practice',
    accessorKey: 'organizationPractice',
    header: () => (
      <ColumnHeader
        label="Organization/Practice"
        className="px-1 py-0.5 !text-1 !font-medium"
      />
    ),
    cell: ({ row }) => (
      <TextCell className="px-1 py-0.5  !text-1">
        {row.original.organizationPractice}
      </TextCell>
    ),
  },
  {
    id: 'issuance-date',
    accessorKey: 'issuanceDate',
    header: () => (
      <ColumnHeader
        label="Issuance Date"
        className="px-1 py-0.5 !text-1 !font-medium"
      />
    ),
    cell: ({ row }) => (
      <TextCell className="px-1 py-0.5 !text-1">
        {row.original.issuanceDate}
      </TextCell>
    ),
  },
  {
    id: 'signing-date',
    accessorKey: 'signingDate',
    header: () => (
      <ColumnHeader
        label="Signing Date"
        className="px-1 py-0.5 !text-1 !font-medium"
      />
    ),
    cell: ({ row }) => (
      <TextCell className="px-1 py-0.5 !text-1">
        {row.original.signingDate}
      </TextCell>
    ),
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: () => (
      <ColumnHeader
        label="Status"
        className="px-1 py-0.5 !text-1 !font-medium"
      />
    ),
    cell: ({ row }) => <StatusCell row={row} />,
  },
  {
    id: 'actions',
    accessorKey: 'actions',
    header: () => (
      <ColumnHeader
        label="Actions"
        className="px-1 py-0.5 !text-1 !font-medium"
      />
    ),
    cell: ({ row }) => <ActionsCell row={row} />,
  },
]

const DataTable = () => {
  const { data, fetchPolicies, loading } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    fetchPolicies: state.fetchPolicies,
  }))

  useEffect(() => {
    fetchPolicies()
  }, [])

  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <Flex direction="column" className="gap-0.5">
      <FilterForm />
      <Box className="bg-white rounded-1 p-2">
        <Table columns={columns} data={data?.consents ?? []} />
      </Box>
    </Flex>
  )
}
export { DataTable }
