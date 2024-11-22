import { notFound } from 'next/navigation'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { getAppointment } from '@/api'
import { ActualNoteView } from './actual-note-view'
import { QuickNotesHeader } from './quicknotes-header'
import { QuickNotesMarkAsError } from './quicknotes-mark-as-error'
import { QuickNotesSaver } from './quicknotes-saver'
import { getCachedWidgetsByVisitType } from './utils'

interface QuickNotesViewProps {
  patientId: string
  appointmentId: string
  visitType: string
  visitSequence: string
}

const QuickNotesView = async ({
  patientId,
  appointmentId,
  visitType,
  visitSequence,
}: QuickNotesViewProps) => {
  const widgets = getCachedWidgetsByVisitType(visitType, visitSequence) || []

  const appointment = await getAppointment(appointmentId)

  if (appointment.state === 'error' || !visitType) {
    return notFound()
  }

  return (
    <Flex width="100%" direction="column">
      <QuickNotesSaver />
      <QuickNotesHeader appointment={appointment.data} />
      <Flex className="h-full max-h-[calc(100dvh-408px)] w-full">
        <ScrollArea className="h-full pr-3" type="always" scrollbars="vertical">
          <Flex direction="column" height="100%" gap="2">
            {widgets.map(({ component: WidgetComponent, id }) => {
              if (!WidgetComponent) return null
              return <WidgetComponent key={id} patientId={patientId} />
            })}
          </Flex>
        </ScrollArea>
        <ActualNoteView
          patientId={patientId}
          appointment={appointment.data}
          widgets={widgets}
        />
      </Flex>
      <QuickNotesMarkAsError />
    </Flex>
  )
}

export { QuickNotesView }
