'use client'

import { transformIn } from '@/ui/social-hx/social-hx-widget/data'
import { getWidgetContainerCheckboxStateByWidgetId } from '@/utils'
import { QuickNoteSectionName } from '../../constants'
import { NoteDetailProps } from '../types'
import { Details } from './details'

const SocialHxNoteDetailView = ({
  data,
  visitType,
  visitSequence,
}: NoteDetailProps) => {
  const transformedData = transformIn(data)

  const actualNoteViewVisibility = getWidgetContainerCheckboxStateByWidgetId({
    widgetId: QuickNoteSectionName.QuickNoteSectionSocialHx,
    visitType,
    visitSequence,
    initialValue: transformedData.widgetContainerCheckboxField,
  })?.actualNoteViewVisibility

  if (data.length === 0) return null
  return (
    <Details
      data={transformedData}
      actualNoteViewVisibility={actualNoteViewVisibility}
    />
  )
}

export { SocialHxNoteDetailView }
