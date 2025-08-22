'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { useStore as zustandUseStore } from 'zustand'
import { CodesetSelectCell, PropsWithRow } from '@/components'
import { Experience } from '@/types'
import { updateRatingReasonAction } from '../actions'
import { useStore } from '../store'

const ReasonSelectCell = ({
  row: { original: experience },
}: PropsWithRow<Experience>) => {
  const store = useStore()
  const { data, setData } = zustandUseStore(store, (state) => ({
    setData: state.setData,
    data: state.data,
  }))
  const [selectedValue, setSelectedValue] = useState(
    experience?.ratingReason ?? '',
  )

  const updateAppointmentRatingReason = async (value: string) => {
    setSelectedValue(value)
    const result = await updateRatingReasonAction(experience.appointmentId, {
      appointmentId: experience.appointmentId,
      appointmentRatingReason: value,
    })

    if (result.state === 'error') {
      setSelectedValue(experience?.ratingReason ?? '')
      return toast.error(result.error ?? 'Failed to update!')
    }

    const updatedData = data?.experiences.map((item) => {
      if (experience.appointmentId === item.appointmentId) {
        return {
          ...item,
          ratingReason: value,
        }
      }
      return item
    })

    setData(updatedData ?? [])
    toast.success('Successfully updated!')
  }

  return (
    <CodesetSelectCell
      value={selectedValue}
      onValueChange={updateAppointmentRatingReason}
      codeset="AppointmentRatingReason"
    />
  )
}

export { ReasonSelectCell }
