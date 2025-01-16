'use client'

import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { QuickNoteSectionItem } from '@/types'
import { transformIn } from '@/ui/family-psych-hx/family-psych-hx-widget/data'
import { getWidgetContainerCheckboxStateByWidgetId } from '@/utils'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type PastPsychHxDetailsProps = {
  visitType: string
  visitSequence: string
  data?: QuickNoteSectionItem[]
}

const FamilyPsychDetailClientView = ({
  visitType,
  visitSequence,
  data,
}: PastPsychHxDetailsProps) => {
  const transformedData = transformIn(data ?? [])

  const actualNoteViewVisibility = getWidgetContainerCheckboxStateByWidgetId({
    widgetId: QuickNoteSectionName.QuickNoteSectionFamilyPsychHx,
    visitType,
    visitSequence,
    initialValue: transformedData.widgetContainerCheckboxField,
  })?.actualNoteViewVisibility

  const relationshipCodeset = useCodesetCodes(CODESETS.Relationship)

  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuickNoteSectionFamilyPsychHx}
    >
      <Details
        data={transformedData}
        actualNoteViewVisibility={actualNoteViewVisibility}
        relationshipCodeset={relationshipCodeset}
      />
    </ActualNoteDetailsWrapper>
  )
}

export { FamilyPsychDetailClientView }
