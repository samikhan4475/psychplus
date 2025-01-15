'use client'

import { QuickNoteSectionItem } from '@/types'
import { transformIn } from '@/ui/past-psych-hx/past-psych-hx-widget/data'
import { getWidgetContainerCheckboxStateByWidgetId } from '@/utils'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type PastPsychHxDetailsProps = {
  visitType: string
  visitSequence: string
  data?: QuickNoteSectionItem[]
}

const PastPsychlDetailClientView = ({
  visitType,
  visitSequence,
  data,
}: PastPsychHxDetailsProps) => {
  const transformedData = transformIn(data ?? [])

  const actualNoteViewVisibility = getWidgetContainerCheckboxStateByWidgetId({
    widgetId: QuickNoteSectionName.QuickNoteSectionPastPsychHx,
    visitType,
    visitSequence,
    initialValue: transformedData.widgetContainerCheckboxField,
  })?.actualNoteViewVisibility

  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuickNoteSectionPastPsychHx}
    >
      <Details
        data={transformedData}
        actualNoteViewVisibility={actualNoteViewVisibility}
      />
    </ActualNoteDetailsWrapper>
  )
}

export { PastPsychlDetailClientView }
