'use client'

import { useEffect } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import { WidgetContainer } from '@/components'
import { Appointment } from '@/types'
import { FollowUpForm } from './follow-up-widget'
import { FollowUpTable } from './follow-up-widget/follow-up-table'
import { useStore } from './follow-up-widget/store'

interface FollowUpViewProps {
  patientId: string
  appointmentId: string
  initialValue: Appointment[]
}

const QuicknotesFollowUpWidget = ({
  patientId,
  appointmentId,
  initialValue,
}: FollowUpViewProps) => {
  const { setData } = useStore((state) => ({
    setData: state.setData,
  }))

  useEffect(() => {
    setData(initialValue)
  }, [initialValue])

  return (
    <WidgetContainer title="Follow Up" className="w-full">
      <FollowUpForm patientId={patientId} appointmentId={appointmentId} />

      <ScrollArea className="max-h-[200px] overflow-y-auto pr-2.5">
        <FollowUpTable />
      </ScrollArea>
    </WidgetContainer>
  )
}

export { QuicknotesFollowUpWidget }
