'use client'

import { useState } from 'react'
import { IconButton } from '@radix-ui/themes'
import { Trash2Icon } from 'lucide-react'
import toast from 'react-hot-toast'
import { type PropsWithRow } from '@/components'
import { Appointment } from '@/types'
import { cancelAppointmentAction } from '../actions'
import { useStore } from '../store'

const RowActionDelete = ({
  row: { original: record },
}: PropsWithRow<Appointment>) => {
  const [loading, setLoading] = useState(false)
  const { data, setData } = useStore((state) => ({
    data: state.data,
    setData: state.setData,
  }))

  const deleteAppointment = async () => {
    setLoading(true)
    const response = await cancelAppointmentAction(
      record.patientId,
      record.appointmentId,
    )

    if (response.state === 'error') {
      toast.error('Failed to delete')
    } else {
      toast.success('Deleted')
      setData(
        data
          ? data.filter((item) => item.appointmentId !== record.appointmentId)
          : [],
      )
    }
    setLoading(false)
  }

  return (
    <IconButton
      size="1"
      color="gray"
      variant="ghost"
      onClick={deleteAppointment}
      disabled={loading}
    >
      <Trash2Icon color={loading ? 'gray' : 'black'} height="14" width="14" />
    </IconButton>
  )
}

export { RowActionDelete }
