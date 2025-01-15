'use client'

import { Appointment, QuickNoteSectionItem } from '@/types'
import { transformIn } from '@/ui/physical-exam/physical-exam-widget/data'
import { getWidgetContainerCheckboxStateByWidgetId } from '@/utils'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type PhysicalExamProps = {
  visitType: string
  visitSequence: string
  appointment: Appointment
  data?: QuickNoteSectionItem[]
}

const PhysicalExamClientView = ({
  visitType,
  visitSequence,
  appointment,
  data,
}: PhysicalExamProps) => {
  const transformedData = transformIn(data ?? [])

  const actualNoteViewVisibility = getWidgetContainerCheckboxStateByWidgetId({
    widgetId: QuickNoteSectionName.QuicknoteSectionPhysicalExam,
    visitType,
    visitSequence,
    initialValue: transformedData.widgetContainerCheckboxField,
    providerType: appointment.providerType,
  })?.actualNoteViewVisibility

  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuicknoteSectionPhysicalExam}
    >
      <Details
        data={transformedData}
        actualNoteViewVisibility={actualNoteViewVisibility}
      />
    </ActualNoteDetailsWrapper>
  )
}

export { PhysicalExamClientView }
