import { ColumnDef } from '@tanstack/react-table'
import { useFormContext } from 'react-hook-form'
import { ColumnHeader, DataTable, LongTextCell } from '@/components'
import { BlockTableContainer } from '@/ui/clinic-schedule/shared'
import {
  AddServiceHeader,
  BookingFrequencySelectCell,
  DeleteServiceCell,
  RequiredColumnHeader,
} from '../cells'
import { SchemaType } from '../schema'

const columns: ColumnDef<{ service: string; bookingFrequency: string }>[] = [
  {
    id: 'service',
    accessorKey: 'service',
    header: ({ column }) => <AddServiceHeader />,
    cell: ({ row }) => <LongTextCell>{row.original.service}</LongTextCell>,
  },
  {
    id: 'booking-frequency',
    accessorKey: 'bookingFrequency',
    header: ({ column }) => (
      <RequiredColumnHeader>
        <ColumnHeader column={column} label="Booking Frequency" />
      </RequiredColumnHeader>
    ),
    cell: ({ row }) => <BookingFrequencySelectCell />,
  },
  {
    id: 'delete-action-cell',
    cell: ({ row }) => <DeleteServiceCell id={row.index} />,
  },
]

const AddServiceBlock = () => {
  const form = useFormContext<SchemaType>()
  const services = form.watch('services')
  return (
    <BlockTableContainer flexGrow="1">
      <DataTable
        columns={columns}
        data={services}
        tableClass="[&_.rt-ScrollAreaScrollbar]:!hidden"
        thClass="last-of-type:w-8"
      />
    </BlockTableContainer>
  )
}

export { AddServiceBlock }
