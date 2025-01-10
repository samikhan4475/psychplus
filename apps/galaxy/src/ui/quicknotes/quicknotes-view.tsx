import { Flex, ScrollArea, Text } from '@radix-ui/themes'
import { getAppointment } from '@/api'
import { ActualNoteView } from './actual-note-view'
import { getStaff } from './api'
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
  const appointment = await getAppointment({
    id: appointmentId,
    isIncludeCodes: true,
    isIncludeCosigners: true,
    isIncludeLocation: true,
  })

  if (appointment.state === 'error') {
    return <Text>{appointment.error}</Text>
  }

  const appointmentProvider = await getStaff(
    Number(appointment.data.providerStaffId),
  )

  if (appointmentProvider.state === 'error') {
    return <Text>{appointmentProvider.error}</Text>
  }

  if (!visitType) {
    return <Text>Missing VisitType</Text>
  }

  const widgets =
    getCachedWidgetsByVisitType(
      visitType,
      visitSequence,
      appointment.data.providerType,
    ) || []

  return (
    <Flex width="100%" direction="column">
      <QuickNotesSaver />
      <QuickNotesHeader
        appointment={appointment.data}
        appointmentProvider={appointmentProvider.data}
      />
      <Flex className="h-full max-h-[calc(100dvh-408px)] w-full">
        <ScrollArea className="h-full pr-3" type="always" scrollbars="vertical">
          <Flex direction="column" height="100%" gap="2">
            {widgets.map(({ component: WidgetComponent, id }) => {
              if (!WidgetComponent) return null
              return (
                <WidgetComponent
                  key={id}
                  patientId={patientId}
                  appointmentId={appointmentId}
                  appointment={appointment.data}
                  visitType={visitType}
                  visitSequence={visitSequence}
                />
              )
            })}
          </Flex>
        </ScrollArea>
        <ActualNoteView
          patientId={patientId}
          appointment={appointment.data}
          widgets={widgets}
          visitType={visitType}
          visitSequence={visitSequence}
        />
      </Flex>
      <QuickNotesMarkAsError />
    </Flex>
  )
}

export { QuickNotesView }
