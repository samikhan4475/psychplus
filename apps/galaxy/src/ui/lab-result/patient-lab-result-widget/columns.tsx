import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { formatDate } from '@/utils/date'
import { CollapseCell } from './cells/collapse-cell'
import { LabResults } from './types'
import { LabResultResponseUpdated } from './utils'

const Columns = (
  data: LabResultResponseUpdated[],
): ColumnDef<LabResultResponseUpdated>[] => {
  const labReports = data ?? []

  const uniqueDates = [
    ...new Set(
      labReports.flatMap((report: LabResultResponseUpdated) => [
        ...(report.subRows?.map(
          (subRow: LabResults) => subRow.observationTime,
        ) || []),
      ]),
    ),
  ].sort(
    (a: string, b: string) => new Date(a).getTime() - new Date(b).getTime(),
  )

  return [
    {
      id: 'lab-result-history',
      header: () => <ColumnHeader clientSideSort label="Test/Panel" />,
      cell: ({ row }: any) => {
        if (row.depth === 0) {
          return <CollapseCell row={row} />
        } else {
          return <TextCell>{row.original?.resultName}</TextCell>
        }
      },
      size: 20,
    },

    ...uniqueDates.map((date: string, index: number) => ({
      id: `date-${index}`,
      header: () => <ColumnHeader label={formatDate(date)} />,
      cell: ({ row }: any) => {
        const original = row.original

        if (row.depth > 0) {
          return (
            <TextCell>
              {original.observationTime === date
                ? `${original.resultValue} ${original.resultUnit}`
                : 'N/A'}
            </TextCell>
          )
        }
      },
    })),
  ]
}

export { Columns }
