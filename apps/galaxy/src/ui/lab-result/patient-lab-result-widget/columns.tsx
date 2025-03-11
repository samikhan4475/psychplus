import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { formatDate } from '@/utils/date'
import { CollapseCell } from './cells/collapse-cell'
import {
  GroupedResultsByDate,
  LabResultResponseTransformed,
  LabResults,
} from './types'

const processSubRows = (subRows: LabResults[]) => {
  const groupedResults: Record<string, GroupedResultsByDate> = {}

  subRows.forEach((subRow) => {
    const resultName = subRow.resultName ?? 'Unknown'
    const observationTime = subRow.observationTime

    if (!groupedResults[resultName]) {
      groupedResults[resultName] = {}
    }

    const existingResult = groupedResults[resultName][observationTime]

    if (
      !existingResult ||
      new Date(existingResult.metadata.createdOn) <
        new Date(subRow.metadata.createdOn)
    ) {
      groupedResults[resultName][observationTime] = subRow
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

export { Columns, processSubRows }
