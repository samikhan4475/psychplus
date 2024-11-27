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
import { StateCosigner } from '../types'

const columns: ColumnDef<StateCosigner>[] = [
  {
    id: 'telestate',
    accessorKey: 'telestate',
    header: ({ column }) => <ColumnHeader column={column} label="Tele State" />,
    cell: ({ row }) => <TextCell>{row.original.telestate}</TextCell>,
  },
  {
    id: 'cosigner',
    accessorKey: 'cosigner',
    header: ({ column }) => <ColumnHeader column={column} label="Cosigner" />,
    cell: ({ row }) => <TextCell>{row.original.cosigner}</TextCell>,
  },
]

const data: StateCosigner[] = [
  {
    telestate: 'California',
    cosigner: 'John Smith, MD',
  },
  {
    telestate: 'New York',
    cosigner: 'John Doe, MD',
  },
  {
    telestate: 'Florida',
    cosigner: 'John Wick, MD',
  },
]

const CosignerCell = ({
  row: { original: clinicTime },
}: PropsWithRow<ClinicTime>) => {
  return (
    <Flex align="center" gapX="1">
      <InfoCellPopover columns={columns} data={data} />
      <LongTextCell className='min-w-32'>{clinicTime.cosigner}</LongTextCell>
    </Flex>
  )
}

export { CosignerCell }
