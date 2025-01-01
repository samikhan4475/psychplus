'use client'

import { transformIn } from '@/ui/past-medical-hx/past-medical-hx-widget/data'
import { getWidgetContainerCheckboxStateByWidgetId } from '@/utils'
import { QuickNoteSectionName } from '../../constants'
import { NoteDetailProps } from '../types'
import { Details } from './details'

const PastMedicalHxNoteDetailView = ({
  data,
  visitType,
  visitSequence,
}: NoteDetailProps) => {
  if (data.length === 0) return null
  const transformedData = transformIn(data)

  const actualNoteViewVisibility = getWidgetContainerCheckboxStateByWidgetId({
    widgetId: QuickNoteSectionName.QuickNoteSectionSubstanceUseHx,
    visitType,
    visitSequence,
    initialValue: transformedData.widgetContainerCheckboxField,
  })?.actualNoteViewVisibility
  return (
    <Details
      data={transformIn(data)}
      actualNoteViewVisibility={actualNoteViewVisibility}
    />
  )
}

export { PastMedicalHxNoteDetailView }
