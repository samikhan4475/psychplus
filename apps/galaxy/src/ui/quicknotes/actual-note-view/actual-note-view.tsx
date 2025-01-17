'use client'

import { Flex, ScrollArea } from '@radix-ui/themes'
import { Appointment, PatientProfile, QuickNoteSectionItem } from '@/types'
import { QuickNoteDataProvider } from '../quick-note-data-provider'
import { WidgetType } from '../types'
import { ActualNoteViewClient } from './actual-note-client'
import { NoteViewHeader } from './note-view-header'
import { PsychiatricEvaluation } from './psychiatric-evaluation'

interface ActualNoteViewProps {
  patientId: string
  appointment: Appointment
  widgets: WidgetType[]
  data: QuickNoteSectionItem[]
  visitType: string
  visitSequence: string
  patient: PatientProfile
  appointmentId: string
}
const ActualNoteView = ({
  appointment,
  patientId,
  widgets,
  visitType,
  visitSequence,
  patient,
  appointmentId,
  data = [],
}: ActualNoteViewProps) => {
  return (
    <ActualNoteViewClient>
      <ScrollArea className="max-w-96 min-w-96 h-full">
        <NoteViewHeader />
        <Flex
          id="actual-note-view"
          gap="1"
          p="2"
          className="bg-white"
          direction="column"
        >
          <PsychiatricEvaluation patient={patient} appointment={appointment} />
          {widgets.map(({ id, actualNoteComponent: ActualNoteComponent }) => {
            if (!ActualNoteComponent) return null

            return (
              <QuickNoteDataProvider
                key={id}
                id={id}
                component={ActualNoteComponent}
                appointment={appointment}
                patient={patient}
                patientId={patientId}
                data={data?.filter(({ sectionName }) => sectionName === id)}
                visitType={visitType}
                visitSequence={visitSequence}
                appointmentId={appointmentId}
              />
            )
          })}
        </Flex>
      </ScrollArea>
    </ActualNoteViewClient>
  )
}

export { ActualNoteView }
