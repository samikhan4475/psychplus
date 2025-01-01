'use client'

import { transformIn } from '@/ui/past-psych-hx/past-psych-hx-widget/data'
import { getWidgetContainerCheckboxStateByWidgetId } from '@/utils'
import { QuickNoteSectionName } from '../../constants'
import { NoteDetailProps } from '../types'
import { Details } from './details'

const PastPsychlNoteDetailView = ({
  data,
  visitType,
  visitSequence,
}: NoteDetailProps) => {
  const transformedData = transformIn(data)

  const actualNoteViewVisibility = getWidgetContainerCheckboxStateByWidgetId({
    widgetId: QuickNoteSectionName.QuickNoteSectionPastPsychHx,
    visitType,
    visitSequence,
    initialValue: transformedData.widgetContainerCheckboxField,
  })?.actualNoteViewVisibility
  if (data.length === 0) return null
  return (
    <Details
      data={transformIn(data)}
      actualNoteViewVisibility={actualNoteViewVisibility}
    />
  )
}

export { PastPsychlNoteDetailView }
