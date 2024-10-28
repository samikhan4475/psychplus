import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { useFormContext } from 'react-hook-form'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { cn } from '@/utils'
import { TmsWidgetSchemaType } from '../../../tms-widget-schema'

interface TableDataType {
  dateTime: string
  user: string
  motorThersholdPercent: string
}

const columns: ColumnDef<TableDataType>[] = [
  {
    id: 'label',
    accessorKey: 'label',
    header: ({ column }) => (
      <ColumnHeader column={column} label={'Date/Time'} />
    ),
    cell: ({ row }) => (
      <TextCell>
        {row?.original?.dateTime
          ? format(new Date(row?.original?.dateTime), 'MM/dd/yyyy hh:mm')
          : ''}
      </TextCell>
    ),
  },
  {
    id: 'user',
    accessorKey: 'user',
    header: ({ column }) => <ColumnHeader column={column} label={'User'} />,
    cell: ({ row }) => <TextCell>{row?.original?.user ?? ''}</TextCell>,
  },
  {
    id: 'MT',
    accessorKey: 'MT',
    header: ({ column }) => <ColumnHeader column={column} label={'MT%'} />,
    cell: ({ row }) => (
      <TextCell>{row?.original?.motorThersholdPercent ?? ''}</TextCell>
    ),
  },
]

interface ThresholdTableProps {
  className?: string
  renderFirstRowOnly?: boolean
}

const ThresholdTable = ({
  className = 'w-[100%]',
  renderFirstRowOnly = false,
}: ThresholdTableProps) => {
  const form = useFormContext<TmsWidgetSchemaType>()
  const motorThersholdData = form.watch('motorThershold')

  const data =
    renderFirstRowOnly && motorThersholdData.length > 0
      ? [motorThersholdData[0]]
      : motorThersholdData

  return <DataTable columns={columns} data={data} tableClass={cn(className)} />
}

export { ThresholdTable }
