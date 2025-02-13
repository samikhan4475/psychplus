'use client'

import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { transformIn } from '@/ui/family-psych-hx/family-psych-hx-widget/data'
import { getWidgetContainerCheckboxStateByWidgetId } from '@/utils'
import { QuickNoteSectionName } from '../../constants'
import { NoteDetailProps } from '../types'
import { Details } from './details'

const FamilyPsychNoteDetailView = ({
  data,
  visitType,
  visitSequence,
}: NoteDetailProps) => {
  const transformedData = transformIn(data)

  const actualNoteViewVisibility = getWidgetContainerCheckboxStateByWidgetId({
    widgetId: QuickNoteSectionName.QuickNoteSectionFamilyPsychHx,
    visitType,
    visitSequence,
    initialValue: transformedData.widgetContainerCheckboxField,
  })?.actualNoteViewVisibility

  const RELATIONSHIP_OPTIONS = useCodesetCodes(CODESETS.Relationship).filter(
    (item) => item.groupingCode === 'PRIMARY',
  )

  if (data.length === 0) return null
  return (
    <Details
      data={transformedData}
      actualNoteViewVisibility={actualNoteViewVisibility}
      relationshipCodeset={RELATIONSHIP_OPTIONS}
    />
  )
}

export { FamilyPsychNoteDetailView }
