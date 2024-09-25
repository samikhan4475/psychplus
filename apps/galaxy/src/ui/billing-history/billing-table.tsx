'use client'

import { useEffect } from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { ActionsCell } from './cells'
import { useStore } from './store'
import { BillingHistory } from './types'

const columns: ColumnDef<BillingHistory>[] = [
  {
    id: 'visit',
    accessorKey: 'visit',
    header: () => (
      <ColumnHeader className="!text-1 !font-medium" label="Visit #" />
    ),
    cell: ({ row }) => (
      <Box>
        <TextCell>{row.original.visit} </TextCell>
      </Box>
    ),
  },
  {
    id: 'dateTime',
    accessorKey: 'dateTime',
    header: () => (
      <ColumnHeader className="!text-1 !font-medium" label="Date/Time" />
    ),
    cell: ({ row }) => (
      <Box>
        <TextCell>{row.original.dateTime} </TextCell>
      </Box>
    ),
  },
  {
    id: 'location',
    accessorKey: 'location',
    header: () => (
      <ColumnHeader className="!text-1 !font-medium" label="Location" />
    ),
    cell: ({ row }) => (
      <Box>
        <TextCell>{row.original.location} </TextCell>
      </Box>
    ),
  },
  {
    id: 'visitType',
    accessorKey: 'visitType',
    header: () => (
      <ColumnHeader className="!text-1 !font-medium" label="Visit Type" />
    ),
    cell: ({ row }) => (
      <Box>
        <TextCell>{row.original.visitType}</TextCell>
      </Box>
    ),
  },
  {
    id: 'provider',
    accessorKey: 'provider',
    header: () => (
      <ColumnHeader className="!text-1 !font-medium" label="Provider" />
    ),
    cell: ({ row }) => (
      <Box>
        <TextCell>{row.original.provider}</TextCell>
      </Box>
    ),
  },
  {
    id: 'coSigner',
    accessorKey: 'cosSigner',
    header: () => (
      <ColumnHeader className="!text-1 !font-medium" label="Cosigner" />
    ),
    cell: ({ row }) => (
      <Box>
        <TextCell>{row.original.coSigner}</TextCell>
      </Box>
    ),
  },
  {
    id: 'primaryIns',
    accessorKey: 'primaryIns',
    header: () => (
      <ColumnHeader className="!text-1 !font-medium" label="Primary Ins." />
    ),
    cell: ({ row }) => (
      <Box>
        <TextCell>{row.original.primaryIns}</TextCell>
      </Box>
    ),
  },
  {
    id: 'secondaryIns',
    accessorKey: 'secondaryIns',
    header: () => (
      <ColumnHeader className="!text-1 !font-medium" label="Secondary Ins." />
    ),
    cell: ({ row }) => (
      <Box>
        <TextCell>{row.original.secondaryIns}</TextCell>
      </Box>
    ),
  },
  {
    id: 'financial',
    accessorKey: 'financial',
    header: () => (
      <ColumnHeader className="!text-1 !font-medium" label="Financial" />
    ),
    cell: ({ row }) => (
      <Box>
        <TextCell>{row.original.financial}</TextCell>
      </Box>
    ),
  },
  {
    id: 'diagnosis',
    accessorKey: 'diagnosis',
    header: () => (
      <ColumnHeader className="!text-1 !font-medium" label="Diagnosis" />
    ),
    cell: ({ row }) => (
      <Box>
        <TextCell>{row.original.diagnosis}</TextCell>
      </Box>
    ),
  },
  {
    id: 'cptCodes',
    accessorKey: 'cptCodes',
    header: () => (
      <ColumnHeader className="!text-1 !font-medium" label="CPT Codes" />
    ),
    cell: ({ row }) => (
      <Box>
        <TextCell>{row.original.cptCodes}</TextCell>
      </Box>
    ),
  },
  {
    id: 'schedulingStatus',
    accessorKey: 'schedulingStatus',
    header: () => (
      <ColumnHeader
        className="!text-1 !font-medium"
        label="Scheduling Status "
      />
    ),
    cell: ({ row }) => (
      <Box>
        <TextCell>{row.original.schedulingStatus}</TextCell>
      </Box>
    ),
  },
  {
    id: 'verification',
    accessorKey: 'verification',
    header: () => (
      <ColumnHeader className="!text-1 !font-medium" label="Verification " />
    ),
    cell: ({ row }) => (
      <Box>
        <TextCell>{row.original.verification}</TextCell>
      </Box>
    ),
  },
  {
    id: 'billingStatus ',
    accessorKey: 'billingStatus ',
    header: () => (
      <ColumnHeader className="!text-1 !font-medium" label="Billing Status  " />
    ),
    cell: ({ row }) => (
      <Box>
        <TextCell>{row.original.billingStatus}</TextCell>
      </Box>
    ),
  },
  {
    id: 'cmd',
    accessorKey: 'cmd',
    header: () => (
      <ColumnHeader className="!text-1 !font-medium" label="CMD  " />
    ),
    cell: ({ row }) => (
      <Box>
        <TextCell>{row.original.cmd}</TextCell>
      </Box>
    ),
  },
  {
    id: 'sign',
    accessorKey: 'sign',
    header: () => (
      <ColumnHeader className="!text-1 !font-medium" label="Sign  " />
    ),
    cell: ({ row }) => (
      <Box>
        <TextCell>{row.original.sign}</TextCell>
      </Box>
    ),
  },
  {
    id: 'action',
    accessorKey: 'action',
    header: () => (
      <ColumnHeader className="!text-1 !font-medium" label="Action" />
    ),
    cell: ({ row }) => <ActionsCell row={row} />,
  },
]
const BillingTable = () => {
  const { data, fetch, loading } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    fetch: state.fetch,
    showFilters: state.showFilters,
  }))

  useEffect(() => {
    fetch()
  }, [])

  return (
    <>
      {loading ? (
        <Flex height="100%" align="center" justify="center">
          <LoadingPlaceholder />
        </Flex>
      ) : (
        <Box className="bg-white rounded-bl-1 rounded-br-1 p-2">
          <DataTable columns={columns} data={data?.billingHistories ?? []} />
        </Box>
      )}
    </>
  )
}

export { BillingTable }
