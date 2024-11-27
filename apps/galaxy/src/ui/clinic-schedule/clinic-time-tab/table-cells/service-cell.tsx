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

const columns: ColumnDef<{ service: string }>[] = [
  {
    id: 'service',
    accessorKey: 'service',
    header: ({ column }) => <ColumnHeader column={column} label="Services" />,
    cell: ({ row }) => <TextCell>{row.original.service}</TextCell>,
  },
]

const data: { service: string }[] = [
  {
    service: 'Outpatient Psychiatry',
  },
  {
    service: 'Individual Psychiatry',
  },
  {
    service: 'Psychotherapy',
  },
]

const ServiceCell = ({
  row: { original: clinicTime },
}: PropsWithRow<ClinicTime>) => {
  return (
    <Flex align="center" gapX="1">
      <InfoCellPopover columns={columns} data={data} />
      <LongTextCell className="min-w-52">{clinicTime.service}</LongTextCell>
    </Flex>
  )
}

export { ServiceCell }
