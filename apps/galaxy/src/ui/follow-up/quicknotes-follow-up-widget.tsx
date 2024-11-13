'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { ScrollArea } from '@radix-ui/themes'
import { saveWidgetAction } from '@/actions/save-widget'
import { WidgetContainer } from '@/components'
import { FollowUpForm } from './follow-up-widget'
import { transformOut } from './follow-up-widget/data'
import { FollowUpTable } from './follow-up-widget/follow-up-table'
import { useStore } from './follow-up-widget/store'

interface FollowUpViewProps {
  patientId: string
}

const QuicknotesFollowUpWidget = ({ patientId }: FollowUpViewProps) => {
  const searchParams = useSearchParams()

  const appointmentId = searchParams.get('id') || '0'

  const { search, data } = useStore((state) => ({
    search: state.search,
    data: state.data,
  }))

  const saveAddToNoteFollowUps = async () => {
    const selectedFollowUpIds =
      data?.map((item) => String(item.appointmentId)) ?? []

    const payload = transformOut(
      patientId,
      appointmentId,
    )({ followUpsId: selectedFollowUpIds as string[] })

    await saveWidgetAction({ patientId, data: payload })
  }

  useEffect(() => {
    search({
      patientIds: [Number(patientId)],
      appointmentIds: [Number(appointmentId)],
    })
  }, [])

  useEffect(() => {
    if (data && data.length > 0) saveAddToNoteFollowUps()
  }, [data])

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
