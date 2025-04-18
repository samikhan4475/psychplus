import { Flex } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  LongTextCell,
  PropsWithRow,
  TextCell,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { InfoCellPopover } from '../info-cell-popover'
import { ClinicSchedule, StateCosigner } from '../types'

const columns: ColumnDef<Omit<StateCosigner, 'location'>>[] = [
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

const TelestateCell = ({
  row: { original: clinicTime },
}: PropsWithRow<ClinicSchedule>) => {
  const states = useCodesetCodes(CODESETS.UsStates)

  const data = clinicTime.teleStates?.map((telestate) => ({
    telestate:
      states.find((state) => state.value === telestate.stateCode)?.display ??
      'N/A',
    cosigner: telestate.cosignerStaffName
      ? `${telestate.cosignerStaffName?.firstName} ${telestate.cosignerStaffName?.lastName}, ${telestate.cosignerStaffName?.title}`
      : '',
  }))
  return (
    <Flex align="center" gapX="1">
      {Boolean(clinicTime.teleStates?.length) && (
        <InfoCellPopover columns={columns} data={data} />
      )}
      <LongTextCell>
        {data?.map((state) => state.telestate).join(', ')}
      </LongTextCell>
    </Flex>
  )
}

export { TelestateCell }
