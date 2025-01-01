import { IconButton } from '@radix-ui/themes'
import { EditIcon } from '@/components/icons'
import { EditVisit } from '@/ui/visit/edit-visit'
import { useRefetchAppointments } from '../hooks'

const EditVisitDetailsButton = ({
  appointmentId,
}: {
  appointmentId: number
}) => {
  const refetch = useRefetchAppointments()
  return (
    <EditVisit appointmentId={appointmentId} onEdit={refetch}>
      <IconButton
        variant="ghost"
        className="text-pp-bg-primary cursor-pointer gap-x-1 text-[12px] font-[510]"
      >
        <EditIcon />
        Edit
      </IconButton>
    </EditVisit>
  )
}

export { EditVisitDetailsButton }
