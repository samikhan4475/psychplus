import { Flex } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  LongTextCell,
  PropsWithRow,
  TextCell,
} from '@/components'
import { ClinicTime } from '../../types'
import { InfoCellPopover } from '../info-cell-popover'

const columns: ColumnDef<{ group: string }>[] = [
  {
    id: 'age-group',
    accessorKey: 'group',
    header: ({ column }) => <ColumnHeader column={column} label="Age Group" />,
    cell: ({ row }) => <TextCell>{row.original.group}</TextCell>,
  },
]

const data: { group: string }[] = [
  {
    group: 'Child (5 yo to 12 yo',
  },
  {
    group: 'Adolescent (13 yo to 17 yo)',
  },
  {
    group: 'Adult (18 yo to 54 yo)',
  },
]

const AgeGroupCell = ({
  row: { original: clinicTime },
}: PropsWithRow<ClinicTime>) => {
  return (
    <Flex align="center" gapX="1">
      <InfoCellPopover columns={columns} data={data} />
      <LongTextCell className="text-nowrap">{clinicTime.ageGroup}</LongTextCell>
    </Flex>
  )
}

export { AgeGroupCell }
