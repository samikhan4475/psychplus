'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { IconButton } from '@radix-ui/themes'
import { Trash2Icon } from 'lucide-react'
import toast from 'react-hot-toast'
import { type PropsWithRow } from '@/components'
import { useHasPermission } from '@/hooks'
import { Appointment } from '@/types'
import { useInactiveRowStatus } from '@/ui/schedule/hooks'
import { PermissionAlert } from '@/ui/schedule/shared'
import { cancelAppointmentAction } from '../actions'
import { DELETE_FOLLOWUP_PERMISSION } from '../constants'
import { useStore } from '../store'

const RowActionDelete = ({
  row: { original: record },
}: PropsWithRow<Appointment>) => {
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { search } = useStore((state) => ({ search: state.search }))
  const canDeleteFollowup = useHasPermission('deleteFollowupTab')
  const isInactiveVisit = useInactiveRowStatus(
    record.visitStatus,
    record.isServiceTimeDependent,
  )

  const deleteAppointment = async () => {
    if (!canDeleteFollowup) {
      return setIsOpen(true)
    }
    setLoading(true)
    const response = await cancelAppointmentAction(
      record.patientId,
      record.appointmentId,
    )
    if (response.state === 'error') {
      toast.error(response.error ?? 'Failed to delete')
    } else {
      toast.success('Deleted')
      const appointmentId = searchParams.get('id') || '0'
      search({
        patientIds: [Number(record.patientId)],
        appointmentIds: [Number(appointmentId)],
      })
    }
    setLoading(false)
  }

  return (
    <>
      <PermissionAlert
        isOpen={isOpen}
        message={DELETE_FOLLOWUP_PERMISSION}
        onClose={() => {
          setIsOpen(false)
        }}
      />
      <IconButton
        size="1"
        color="gray"
        variant="ghost"
        onClick={deleteAppointment}
        disabled={loading || isInactiveVisit}
      >
        <Trash2Icon color={loading ? 'gray' : 'black'} height="14" width="14" />
      </IconButton>
    </>
  )
}

export { RowActionDelete }
