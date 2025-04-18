import { Flex } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  LongTextCell,
  PropsWithRow,
  TextCell,
} from '@/components'
import { GROUP_OPTIONS } from '../../constants'
import { InfoCellPopover } from '../info-cell-popover'
import { ClinicSchedule } from '../types'

const columns: ColumnDef<string>[] = [
  {
    id: 'age-group',
    accessorKey: 'group',
    header: ({ column }) => <ColumnHeader column={column} label="Age Group" />,
    cell: ({ row }) => <TextCell>{row.original}</TextCell>,
  },
]

const AgeGroupCell = ({
  row: { original: clinicTime },
}: PropsWithRow<ClinicSchedule>) => {
  const data = GROUP_OPTIONS.filter((option) =>
    clinicTime.ageGroups.find(
      (group) => group.toLowerCase() === option.value.toLowerCase(),
    ),
  ).map((option) => option.label)
  return (
    <Flex align="center" gapX="1">
      <InfoCellPopover columns={columns} data={data} />
      <LongTextCell className="text-nowrap">
        {clinicTime.ageGroups?.join(', ')}
      </LongTextCell>
    </Flex>
  )
}

export { AgeGroupCell }
