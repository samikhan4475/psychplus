import { ColumnHeader, TextCell } from '@/components'
import { CollapseCell } from './cells/collapse-cell'

const Columns = (data: any) => {
  //TODO: replace any with proper type once data schema is decided on the backend
  const labReports = data?.labReports ?? []

  const uniqueDates = [
    ...new Set(
      labReports.flatMap((report: any) => [
        report.date,
        ...(report.subRows?.map((subRow: any) => subRow.date) || []),
      ]),
    ),
  ].sort((a: any, b: any) => new Date(a).getTime() - new Date(b).getTime())

  return [
    {
      id: 'lab-result-history',
      header: () => <ColumnHeader clientSideSort label="Test/Panel" />,
      cell: ({ row }: any) => {
        if (row.depth === 0) {
          return <CollapseCell row={row} />
        } else {
          return <TextCell>{row.original.testPanel || 'N/A'}</TextCell>
        }
      },
      size: 20,
    },

    ...uniqueDates.map((date: any, index: number) => ({
      id: `date-${index}`,
      header: () => <ColumnHeader label={date} />,
      cell: ({ row }: any) => {
        const original = row.original

        if (row.depth > 0) {
          return (
            <TextCell>
              {original.date === date ? original.quantity : 'N/A'}
            </TextCell>
          )
        }
      },
    })),
  ]
}

export { Columns }
