'use client'

import { IconButton, Tooltip } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { CloseIcon } from '@/components/icons'
import { Appointment } from '@/types'
import { useInactiveRowStatus } from '@/ui/schedule/hooks'
import { cn } from '@/utils'
import { deleteActiveVisit } from './actions'
import { useStore } from './store'

interface CancelButtonProps {
  appointment: Appointment
}
const CancelButton = ({
  appointment: {
    patientId,
    appointmentId,
    visitStatus,
    isServiceTimeDependent,
  },
}: CancelButtonProps) => {
  const { refetch } = useStore((state) => ({
    refetch: state.refetch,
  }))

  const isInactiveVisit = useInactiveRowStatus(
    visitStatus,
    isServiceTimeDependent,
  )
  const handleDelete = async () => {
    const response = await deleteActiveVisit({
      patientId,
      appointmentId,
    })
    if (response.state === 'error') {
      return toast.error(response?.error)
    }
    toast.success('Cancelled successfully!')
    refetch()
  }
  return (
    <Tooltip content="Cancel Visit">
      <IconButton
        variant="ghost"
        color="red"
        className="!m-0"
        size="1"
        onClick={handleDelete}
        disabled={isInactiveVisit}
      >
        <CloseIcon
          width={16}
          height={16}
          className={cn({
            'opacity-70 grayscale': isInactiveVisit,
          })}
        />
      </IconButton>
    </Tooltip>
  )
}

export { CancelButton }
