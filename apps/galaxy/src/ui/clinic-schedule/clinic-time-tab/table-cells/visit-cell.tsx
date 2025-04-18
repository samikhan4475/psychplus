import { Flex } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  LongTextCell,
  PropsWithRow,
  TextCell,
} from '@/components'
import { InfoCellPopover } from '../info-cell-popover'
import { ClinicSchedule, Visit } from '../types'

const columns: ColumnDef<Visit>[] = [
  {
    id: 'visit',
    accessorKey: 'visit',
    header: ({ column }) => <ColumnHeader column={column} label="Visit Type" />,
    cell: ({ row }) => (
      <TextCell>{`${row.original.typeOfVisit} - ${row.original.visitSequence} - ${row.original.visitMedium}`}</TextCell>
    ),
  },
]

const VisitCell = ({
  row: { original: clinicTime },
}: PropsWithRow<ClinicSchedule>) => {
  const uniqueVisitTypes = [
    ...new Set(clinicTime.visitTypes?.map((el) => el.typeOfVisit)),
  ]

  return (
    <Flex align="center" gapX="1">
      {!!clinicTime.visitTypes?.length && (
        <InfoCellPopover columns={columns} data={clinicTime.visitTypes} />
      )}
      <LongTextCell className="text-nowrap">
        {uniqueVisitTypes?.map((visit) => visit).join(', ')}
      </LongTextCell>
    </Flex>
  )
}

export { VisitCell }
