'use client'

import { useEffect } from 'react'
import { Box, Flex, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { StateVisits } from '../../types'
import { useStore } from './store'

const columns = (): ColumnDef<StateVisits>[] => {
  return [
    {
      id: 'state',
      accessorKey: 'stateName',
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          label="State"
          className="!text-black p-1 !font-medium"
          clientSideSort
        />
      ),
      cell: ({ row }) => <TextCell>{row.original?.stateName ?? '-'} </TextCell>,
    },
    {
      id: 'total',
      header: () => (
        <ColumnHeader
          label="Total"
          className="!text-black w-full p-1 text-center !font-medium"
        />
      ),
      columns: [
        {
          id: 'total',
          header: ({ column }) => (
            <ColumnHeader
              column={column}
              label="Psychiatry New"
              className="!text-black p-1 !font-medium"
            />
          ),
          cell: ({ row }) => (
            <TextCell>{row.original?.total?.psychiatryNew ?? '-'} </TextCell>
          ),
        },
        {
          id: 'total-psychiatry-est',
          header: ({ column }) => (
            <ColumnHeader
              column={column}
              label="Psychiatry Est"
              className="!text-black p-1 !font-medium"
            />
          ),
          cell: ({ row }) => (
            <TextCell>{row.original?.total?.psychiatryEst ?? '-'} </TextCell>
          ),
        },
        {
          id: 'total-therapy',
          header: ({ column }) => (
            <ColumnHeader
              column={column}
              label="Therapy (60 min)"
              className="!text-black p-1 !font-medium"
            />
          ),
          cell: ({ row }) => (
            <TextCell>{row.original?.total?.therapy ?? '-'} </TextCell>
          ),
        },
      ],
    },
    {
      id: 'public',
      header: () => (
        <ColumnHeader
          label="Public"
          className="!text-black w-full p-1 text-center !font-medium"
        />
      ),
      columns: [
        {
          id: 'public-psychiatry-new',
          header: ({ column }) => (
            <ColumnHeader
              column={column}
              label="Psychiatry New"
              className="!text-black p-1 !font-medium"
            />
          ),
          cell: ({ row }) => (
            <TextCell>{row.original?.public?.psychiatryNew ?? '-'} </TextCell>
          ),
        },
        {
          id: 'public-psychiatry-est',
          header: ({ column }) => (
            <ColumnHeader
              column={column}
              label="Psychiatry Est"
              className="!text-black p-1 !font-medium"
            />
          ),
          cell: ({ row }) => (
            <TextCell>{row.original?.public?.psychiatryEst ?? '-'} </TextCell>
          ),
        },
        {
          id: 'public-therapy',
          header: ({ column }) => (
            <ColumnHeader
              column={column}
              label="Therapy (60 min)"
              className="!text-black p-1 !font-medium"
            />
          ),
          cell: ({ row }) => (
            <TextCell>{row.original?.public?.therapy ?? '-'} </TextCell>
          ),
        },
      ],
    },
    {
      id: 'active',
      header: () => (
        <ColumnHeader
          label="Active"
          className="!text-black w-full p-1 text-center !font-medium"
        />
      ),
      columns: [
        {
          id: 'active-psychiatry-new',
          header: ({ column }) => (
            <ColumnHeader
              column={column}
              label="Psychiatry New"
              className="!text-black p-1 !font-medium"
            />
          ),
          cell: ({ row }) => (
            <TextCell>{row.original?.active?.psychiatryNew ?? '-'} </TextCell>
          ),
        },
        {
          id: 'active-psychiatry-est',
          header: ({ column }) => (
            <ColumnHeader
              column={column}
              label="Psychiatry Est"
              className="!text-black p-1 !font-medium"
            />
          ),
          cell: ({ row }) => (
            <TextCell>{row.original?.active?.psychiatryEst ?? '-'} </TextCell>
          ),
        },
        {
          id: 'active-therapy',
          header: ({ column }) => (
            <ColumnHeader
              column={column}
              label="Therapy (60 min)"
              className="!text-black p-1 !font-medium"
            />
          ),
          cell: ({ row }) => (
            <TextCell>{row.original?.active?.therapy ?? '-'} </TextCell>
          ),
        },
      ],
    },
    {
      id: 'checked-out',
      header: () => (
        <ColumnHeader
          label="Checked Out"
          className="!text-black w-full p-1 text-center !font-medium"
        />
      ),
      columns: [
        {
          id: 'checked-out-psychiatry-new',
          header: ({ column }) => (
            <ColumnHeader
              column={column}
              label="Psychiatry New"
              className="!text-black p-1 !font-medium"
            />
          ),
          cell: ({ row }) => (
            <TextCell>
              {row.original?.checkedOut?.psychiatryNew ?? '-'}{' '}
            </TextCell>
          ),
        },
        {
          id: 'checked-out-psychiatry-est',
          header: ({ column }) => (
            <ColumnHeader
              column={column}
              label="Psychiatry Est"
              className="!text-black p-1 !font-medium"
            />
          ),
          cell: ({ row }) => (
            <TextCell>
              {row.original?.checkedOut?.psychiatryEst ?? '-'}{' '}
            </TextCell>
          ),
        },
        {
          id: 'checked-out-therapy',
          header: ({ column }) => (
            <ColumnHeader
              column={column}
              label="Therapy (60 min)"
              className="!text-black p-1 !font-medium"
            />
          ),
          cell: ({ row }) => (
            <TextCell>{row.original?.checkedOut?.therapy ?? '-'} </TextCell>
          ),
        },
      ],
    },
  ]
}

const VisitByStateListTable = () => {
  const { data, search, loading } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    search: state.search,
  }))

  useEffect(() => {
    search()
  }, [])

  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <ScrollArea className="bg-white h-full flex-1 px-4 py-2">
      <Box className="min-w-max">
        <DataTable
          data={data?.StateVisits ?? []}
          columns={columns()}
          disablePagination
          isRowSpan
          sticky
        />
      </Box>
    </ScrollArea>
  )
}

export { VisitByStateListTable }
