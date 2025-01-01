'use client'

import { transformIn } from '@/ui/substance-use-hx/substance-use-hx-widget/data'
import { getWidgetContainerCheckboxStateByWidgetId } from '@/utils'
import { QuickNoteSectionName } from '../../constants'
import { NoteDetailProps } from '../types'
import { Details } from './details'

const SubstanceUseHxNoteDetailView = ({
  data,
  patient,
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
      sectionName="Substance Use History"
      data={transformIn(data)}
      patient={patient}
      actualNoteViewVisibility={actualNoteViewVisibility}
    />
  )
}

export { SubstanceUseHxNoteDetailView }
