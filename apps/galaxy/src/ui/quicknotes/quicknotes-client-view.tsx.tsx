'use client'

import { useLayoutEffect, useState } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { useShallow } from 'zustand/react/shallow'
import { TreatmentBillingAlert } from '@/components'
import {
  Appointment,
  PatientConsent,
  QuickNoteSectionItem,
  StaffComment,
} from '@/types'
import { ActualNoteView } from './actual-note-view/actual-note-view'
import { QuickNoteSectionName } from './constants'
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
  readonly patientConsents: PatientConsent[]
  readonly widgetsData: QuickNoteSectionItem[]
  staffComments: StaffComment[]
}

export function QuickNotesClientView({
  patientId,
  appointmentId,
  appointment,
  widgets,
  visitType,
  patientConsents,
  visitSequence,
  widgetsData = [],
  staffComments = [],
}: QuickNotesViewProps) {
  const { setWidgetsData, patient, setActualNoteData } = useStore(
    useShallow((state) => ({
      setWidgetsData: state.setWidgetsData,
      setActualNoteData: state.setActualNoteWidgetsData,
      patient: state.patient,
    })),
  )

  const [isOpen, setIsOpen] = useState(false)

  const closeDialog = () => {
    setIsOpen(false)
  }
  const billingComments = staffComments.filter(
    (comment) => comment.isBillingComment && comment.isUrgentComment,
  )
  const treatmentComments = staffComments.filter(
    (comment) => comment.isTreatmentComment && comment.isUrgentComment,
  )
  useLayoutEffect(() => {
    setWidgetsData(widgetsData, true)
    setActualNoteData(widgetsData, true)
    if (billingComments.length > 0 || treatmentComments.length > 0) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointmentId])

  return (
    <Flex width="100%" direction="column">
      <TreatmentBillingAlert
        title="Staff Comments"
        isOpen={isOpen}
        closeDialog={closeDialog}
        billingComments={billingComments ?? []}
        treatmentComments={treatmentComments ?? []}
      />
      <QuickNotesSaver />
      <QuickNotesHeader
        appointment={appointment}
        patientConsents={patientConsents}
      />
      <Flex className="h-full max-h-[calc(100dvh-355px)] w-full">
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
                  data={widgetsData?.filter((item) => item?.sectionName === id)}
                  widgetsData={widgetsData}
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
