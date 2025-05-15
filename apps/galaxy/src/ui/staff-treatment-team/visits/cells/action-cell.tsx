import { Flex, IconButton } from '@radix-ui/themes'
import { type Row } from '@tanstack/react-table'
import { Eye } from 'lucide-react'
import { TableEditIcon } from '@/components/icons'
import { Appointment } from '@/types'
import { EditVisit } from '@/ui/visit/edit-visit'

type VisitListRow = Row<Appointment>

interface ActionsCellProps {
  row: VisitListRow
  viewAppointment: (appointment: Appointment) => void
  refetch: () => void
}

const ActionsCell = ({ row, viewAppointment, refetch }: ActionsCellProps) => {
  return (
    <Flex width="100%" align="center" gap="2">
      <IconButton
        size="1"
        color="gray"
        variant="ghost"
        className="ml-1"
        onClick={() => viewAppointment(row.original)}
      >
        <Eye color="black" height="16" width="16" />
      </IconButton>
      <EditVisit appointmentId={+row.original.appointmentId} onEdit={refetch}>
        <IconButton size="1" color="gray" variant="ghost">
          <TableEditIcon height={18} />
        </IconButton>
      </EditVisit>
    </Flex>
  )
}

export { ActionsCell }
