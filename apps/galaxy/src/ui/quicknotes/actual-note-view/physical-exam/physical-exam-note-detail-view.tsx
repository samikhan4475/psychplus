'use client'

import { transformIn } from '@/ui/physical-exam/physical-exam-widget/data'
import { getWidgetContainerCheckboxStateByWidgetId } from '@/utils'
import { QuickNoteSectionName } from '../../constants'
import { NoteDetailProps } from '../types'
import { Details } from './details'

const PhysicalExamNoteDetailView = ({
  data,
  visitType,
  visitSequence,
  appointment,
}: NoteDetailProps) => {
  if (data.length === 0) return null

  const transformedData = transformIn(data)

  const actualNoteViewVisibility = getWidgetContainerCheckboxStateByWidgetId({
    widgetId: QuickNoteSectionName.QuicknoteSectionPhysicalExam,
    visitType,
    visitSequence,
    initialValue: transformedData.widgetContainerCheckboxField,
    providerType: appointment?.providerType ?? '',
  })?.actualNoteViewVisibility
  return (
    <Details
      data={transformedData}
      actualNoteViewVisibility={actualNoteViewVisibility}
    />
  )
}

export { PhysicalExamNoteDetailView }
