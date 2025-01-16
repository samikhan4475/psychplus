'use client'

import { useLayoutEffect } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { Appointment, QuickNoteSectionItem } from '@/types'
import { ActualNoteView } from './actual-note-view/actual-note-view'
import { QuickNoteDataProvider } from './quick-note-data-provider'
import { QuickNotesHeader } from './quicknotes-header'
import { QuickNotesSaver } from './quicknotes-saver'
import { useStore } from './store'
import { WidgetType } from './types'

interface QuickNotesViewProps {
  readonly patientId: string
  readonly appointmentId: string
  readonly appointment: Appointment
  readonly widgets: WidgetType[]
  readonly visitType: string
  readonly visitSequence: string
  readonly widgetsData: QuickNoteSectionItem[]
}

export function QuickNotesClientView({
  patientId,
  appointmentId,
  appointment,
  widgets,
  visitType,
  visitSequence,
  widgetsData = [],
}: QuickNotesViewProps) {
  const { setWidgetsData, patient } = useStore((state) => ({
    setWidgetsData: state.setWidgetsData,
    patient: state.patient,
  }))

  useLayoutEffect(() => {
    setWidgetsData(widgetsData)
  }, [widgetsData, appointmentId])

  return (
    <Flex width="100%" direction="column">
      <QuickNotesSaver />
      <QuickNotesHeader appointment={appointment} />
      <Flex className="h-full max-h-[calc(100dvh-408px)] w-full">
        <ScrollArea className="h-full pr-3" type="always">
          <Flex direction="column" height="100%" gap="2">
            {widgets.map(({ component: WidgetComponent, id }) => {
              if (!WidgetComponent) return null
              return (
                <QuickNoteDataProvider
                  key={id}
                  id={id}
                  component={WidgetComponent}
                  appointment={appointment}
                  patient={patient}
                  data={widgetsData?.filter(
                    ({ sectionName }) => sectionName === id,
                  )}
                  patientId={patientId}
                  visitType={visitType}
                  appointmentId={appointmentId}
                  visitSequence={visitSequence}
                />
              )
            })}
          </Flex>
        </ScrollArea>
        <ActualNoteView
          patientId={patientId}
          appointment={appointment}
          patient={patient}
          widgets={widgets}
          data={widgetsData}
          visitType={visitType}
          visitSequence={visitSequence}
          appointmentId={appointmentId}
        />
      </Flex>
    </Flex>
  )
}
