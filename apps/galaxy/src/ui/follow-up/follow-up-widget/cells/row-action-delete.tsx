'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { IconButton } from '@radix-ui/themes'
import { Trash2Icon } from 'lucide-react'
import toast from 'react-hot-toast'
import { type PropsWithRow } from '@/components'
import { Appointment } from '@/types'
import { useInactiveRowStatus } from '@/ui/schedule/hooks'
import { cancelAppointmentAction } from '../actions'
import { useStore } from '../store'

const RowActionDelete = ({
  row: { original: record },
}: PropsWithRow<Appointment>) => {
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const { search } = useStore((state) => ({ search: state.search }))
  const isInactiveVisit = useInactiveRowStatus(
    record.visitStatus,
    record.isServiceTimeDependent,
  )

  const deleteAppointment = async () => {
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
    <IconButton
      size="1"
      color="gray"
      variant="ghost"
      onClick={deleteAppointment}
      disabled={loading || isInactiveVisit}
    >
      <Trash2Icon color={loading ? 'gray' : 'black'} height="14" width="14" />
    </IconButton>
  )
}

export { RowActionDelete }
