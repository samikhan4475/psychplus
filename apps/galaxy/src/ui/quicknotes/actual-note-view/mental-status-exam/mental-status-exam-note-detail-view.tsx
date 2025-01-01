'use client'

import { transformIn } from '@/ui/mse/mse-widget/data'
import { getWidgetContainerCheckboxStateByWidgetId } from '@/utils'
import { QuickNoteSectionName } from '../../constants'
import { NoteDetailProps } from '../types'
import { Details } from './details'

const MentalStatusExamNoteDetailView = ({
  data,
  visitType,
  visitSequence,
  appointment,
}: NoteDetailProps) => {
  if (data.length === 0) return null

  const transformedData = transformIn(data)

  const actualNoteViewVisibility = getWidgetContainerCheckboxStateByWidgetId({
    widgetId: QuickNoteSectionName.QuicknoteSectionMse,
    visitType,
    visitSequence,
    initialValue: transformedData.widgetContainerCheckboxField,
    providerType: appointment?.providerType,
  })?.actualNoteViewVisibility
  return (
    <Details
      data={transformIn(data)}
      actualNoteViewVisibility={actualNoteViewVisibility}
    />
  )
}

export { MentalStatusExamNoteDetailView }
