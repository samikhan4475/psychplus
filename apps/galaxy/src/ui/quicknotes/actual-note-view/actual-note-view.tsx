import { Flex, ScrollArea, Text } from '@radix-ui/themes'
import { getPatientProfile } from '@/api'
import { Appointment } from '@/types'
import { WidgetType } from '../types'
import { ActualNoteViewClient } from './actual-note-client'
import { NoteViewHeader } from './note-view-header'
import { PsychiatricEvaluation } from './psychiatric-evaluation'

interface ActualNoteViewProps {
  patientId: string
  appointment: Appointment
  widgets: WidgetType[]
}
const ActualNoteView = async ({
  appointment,
  patientId,
  widgets,
}: ActualNoteViewProps) => {
  const patient = await getPatientProfile(patientId)

  if (patient.state === 'error') {
    return <Text>{patient.error}</Text>
  }

  return (
    <ActualNoteViewClient>
      <ScrollArea className="h-full w-96">
        <NoteViewHeader />
        <Flex gap="1" p="2" className="bg-white" direction="column">
          <PsychiatricEvaluation
            patient={patient.data}
            appointment={appointment}
          />
          {widgets.map(({ id, actualNoteComponent: ActualNoteComponent }) => {
            if (!ActualNoteComponent) return null
            return (
              <ActualNoteComponent
                key={id}
                patientId={patientId}
                appointmentId={String(appointment.id)}
              />
            )
          })}
        </Flex>
      </ScrollArea>
    </ActualNoteViewClient>
  )
}

export { ActualNoteView }
