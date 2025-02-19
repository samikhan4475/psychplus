'use client'

import { IconButton } from '@radix-ui/themes'
import { TableEditIcon } from '@/components/icons'
import { Appointment } from '@/types'
import { useInactiveRowStatus } from '@/ui/schedule/hooks'
import { EditVisit } from '@/ui/visit/edit-visit'
import { cn } from '@/utils'
import { useStore } from './store'

interface EditVisitButtonProps {
  appointment: Appointment
}
const EditVisitButton = ({
  appointment: { appointmentId, visitStatus, isServiceTimeDependent },
}: EditVisitButtonProps) => {
  const isInactiveVisit = useInactiveRowStatus(
    visitStatus,
    isServiceTimeDependent,
  )
  const { refetch } = useStore((state) => ({
    refetch: state.refetch,
  }))
  return (
    <EditVisit appointmentId={appointmentId} onEdit={refetch}>
      <IconButton
        variant="ghost"
        className={cn('!m-0', {
          'opacity-70': isInactiveVisit,
        })}
        color="gray"
        size="1"
        disabled={isInactiveVisit}
      >
        <TableEditIcon height={16} />
      </IconButton>
    </EditVisit>
  )
}

export default EditVisitButton
