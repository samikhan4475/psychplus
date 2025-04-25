'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { WidgetContainer } from '@/components'
import { Appointment } from '@/types'
import { getBookedAppointmentsAction } from '@/ui/schedule/client-actions'
import { FollowUpForm } from './follow-up-form'
import { FollowUpHeader } from './follow-up-header'
import { FollowUpTable } from './follow-up-table'
import { useStore } from './store'

interface FollowUpProps {
  patientId: string
}

const FollowUpWidget = ({ patientId }: FollowUpProps) => {
  const searchParams = useSearchParams()
  const appointmentId = searchParams.get('id') || '0'

  const quickNoteAppointment = useStore((state) => state.quickNoteAppointment)
  const search = useStore((state) => state.search)
  const fetchQuickNoteAppointment = useStore(
    (state) => state.fetchQuickNoteAppointment,
  )

  const fetchData = async () => {
    await fetchQuickNoteAppointment(patientId, appointmentId)
    search({
      patientIds: [Number(patientId)],
      appointmentIds: [Number(appointmentId)],
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Flex className="h-full w-full" direction="column">
      <FollowUpHeader appointmentId={appointmentId} />
      <WidgetContainer>
        <FollowUpForm
          patientId={patientId}
          appointmentData={quickNoteAppointment}
          appointmentId={appointmentId}
        />
        <FollowUpTable />
      </WidgetContainer>
    </Flex>
  )
}

export { FollowUpWidget }
