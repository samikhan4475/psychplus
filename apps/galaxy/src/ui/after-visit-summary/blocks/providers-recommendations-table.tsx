'use client'

import { Box, ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, LongTextCell, TextCell } from '@/components'
import { getSlashedPaddedDateString } from '@/utils'
import { Recommendation } from '../types/recommendation'

export interface ProvidersRecommendationsTableProps {
  recommendations: Recommendation[]
}

const recommendationColumns: ColumnDef<Recommendation>[] = [
  {
    id: 'dateTime',
    accessorKey: 'metadata.createdOn',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Date/Time" />
    ),
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">
        {original.metadata.createdOn
          ? getSlashedPaddedDateString(original.metadata.createdOn)
          : 'N/A'}
      </TextCell>
    ),
  },
  {
    id: 'provider',
    accessorKey: 'metadata.createdByFullName',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Provider" />
    ),
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">
        {original.metadata.createdByFullName ?? 'N/A'}
      </TextCell>
    ),
  },
  {
    id: 'recommendation',
    accessorKey: 'recommendation',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Recommendation" />
    ),
    cell: ({ row: { original } }) => (
      <LongTextCell>{original.recommendation}</LongTextCell>
    ),
  },
]

const ProvidersRecommendationsTable = ({
  recommendations,
}: ProvidersRecommendationsTableProps) => {
  return (
    <Box>
      <ScrollArea className="max-h-[49vh] pb-2">
        <DataTable
          columns={recommendationColumns}
          data={recommendations ?? []}
          theadClass="bg-indigo-3 z-10"
        />
      </ScrollArea>
    </Box>
  )
}

export { ProvidersRecommendationsTable }
