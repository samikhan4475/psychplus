import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DateTimeCell, TextCell } from '@/components'
import { LabResult } from '@/types'
import { formatDate, formatUTCDate } from '@/utils/date'
import { CollapseCell } from './cells/collapse-cell'
import { GroupedResultsByDate, LabResultResponseTransformed } from './types'

const processSubRows = (subRows: LabResult[]) => {
  const groupedResults: Record<string, GroupedResultsByDate> = {}

  subRows.forEach((subRow) => {
    const resultName = subRow.resultName ?? 'Unknown'
    const observationTime = subRow.observationTime

    if (!groupedResults[resultName]) {
      groupedResults[resultName] = {}
    }

    const existingResult =
      groupedResults[resultName][observationTime?.toString() ?? '']

    if (observationTime) {
      const verifiedDate =
        existingResult?.metadata &&
        subRow?.metadata &&
        new Date(existingResult.metadata.createdOn) <
          new Date(subRow.metadata.createdOn)
      if (!existingResult || verifiedDate) {
        groupedResults[resultName][observationTime.toString()] = subRow
      }
    }
  })

  return Object.keys(groupedResults).map((resultName) => ({
    resultName,
    resultsByDate: groupedResults[resultName],
  }))
}

const Columns = (
  data: LabResultResponseTransformed[],
): ColumnDef<LabResultResponseTransformed>[] => {
  const labReports = data ?? []

  const uniqueDates = [
    ...new Set(
      labReports.flatMap(
        (report) =>
          report.subRows?.flatMap((subRow) =>
            Object.keys(subRow.resultsByDate || {}),
          ) || [],
      ),
    ),
  ].sort((a, b) => new Date(a).getTime() - new Date(b).getTime())

  return [
    {
      id: 'test-name',
      header: () => <ColumnHeader clientSideSort label="Test/Panel" />,
      cell: ({ row }: any) => {
        if (row.depth === 0) {
          return <CollapseCell row={row} />
        } else {
          return <TextCell>{row.original.resultName}</TextCell>
        }
      },
      size: 200,
    },

    ...uniqueDates.map((date, index) => ({
      id: `date-${index}`,
      header: () => <ColumnHeader label={formatDate(date)} />,
      cell: ({ row }: any) => {
        if (row.depth > 0) {
          const result = row.original.resultsByDate?.[date]
          if (result)
            return (
              <TextCell>
                {result.resultValue} {result.resultUnit}
              </TextCell>
            )
        }
      },
    })),
  ]
}

const columnsForTableView = (): ColumnDef<LabResult>[] => [
  {
    id: 'test-name',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Test" />
    ),
    cell: ({ row }) => <TextCell>{row.original?.resultName}</TextCell>,
    size: 150,
  },
  {
    id: 'dateTime',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Date/Time" />
    ),
    cell: ({ row }) =>
      row.original?.observationTime && (
        <DateTimeCell>
          {formatUTCDate(
            row.original?.observationTime.toString(),
            'MM/dd/yy HH:mm',
          )}
        </DateTimeCell>
      ),
    size: 50,
  },
  {
    id: 'location',
    header: () => <ColumnHeader clientSideSort label="Location" />,
    cell: ({ row }) => <TextCell>{row.original?.labName}</TextCell>,
    size: 50,
  },
  {
    id: 'results',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Results" />
    ),
    cell: ({ row }) => (
      <TextCell>
        {row.original?.resultValue} {row.original?.resultUnit}
      </TextCell>
    ),
    size: 50,
  },
  {
    id: 'referenceRange',
    header: () => <ColumnHeader clientSideSort label="Reference Range" />,
    cell: ({ row }) => (
      <TextCell>
        {row.original?.recomendedValue} {row.original?.resultUnit}
      </TextCell>
    ),
    size: 50,
  },
]

export { Columns, processSubRows, columnsForTableView }
