'use client'

import { useEffect } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import { WidgetContainer } from '@/components'
import { Appointment } from '@/types'
import { FollowUpForm } from './follow-up-widget'
import { FollowupSaveButton } from './follow-up-widget/follow-up-save-button'
import { FollowUpTable } from './follow-up-widget/follow-up-table'
import { useStore } from './follow-up-widget/store'

interface FollowUpViewProps {
  appointment: Appointment
  patientId: string
  appointmentId: string
  initialValue: Appointment[]
}

const QuicknotesFollowUpWidget = ({
  patientId,
  appointmentId,
  initialValue,
}: FollowUpViewProps) => {
  const setData = useStore((state) => state.setData)
  const quickNoteAppointment = useStore((state) => state.quickNoteAppointment)
  const fetchQuickNoteAppointment = useStore(
    (state) => state.fetchQuickNoteAppointment,
  )

  const fetchData = async () => {
    await fetchQuickNoteAppointment(patientId, appointmentId)
    setData(quickNoteAppointment, initialValue)
  }

  useEffect(() => {
    fetchData()
  }, [initialValue])

  return (
    <WidgetContainer
      title="Follow Up"
      className="w-full"
      headerRight={<FollowupSaveButton appointmentId={appointmentId} />}
    >
      <FollowUpForm
        patientId={patientId}
        appointmentData={quickNoteAppointment}
        appointmentId={appointmentId}
      />

      <ScrollArea className="max-h-[200px] overflow-y-auto pr-2.5">
        <FollowUpTable />
      </ScrollArea>
    </WidgetContainer>
  )
}

export { QuicknotesFollowUpWidget }
