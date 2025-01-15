'use client'

import { QuickNoteSectionItem } from '@/types'
import { transformIn } from '@/ui/social-hx/social-hx-widget/data'
import { getWidgetContainerCheckboxStateByWidgetId } from '@/utils'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type SocialHxDetailsProps = {
  visitType: string
  visitSequence: string
  data?: QuickNoteSectionItem[]
}

const SocialHxDetailClientView = ({
  visitType,
  visitSequence,
  data,
}: SocialHxDetailsProps) => {
  const transformedData = transformIn(data ?? [])

  const actualNoteViewVisibility = getWidgetContainerCheckboxStateByWidgetId({
    widgetId: QuickNoteSectionName.QuickNoteSectionSocialHx,
    visitType,
    visitSequence,
    initialValue: transformedData.widgetContainerCheckboxField,
  })?.actualNoteViewVisibility

  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuickNoteSectionSocialHx}
    >
      <Details
        data={transformedData}
        actualNoteViewVisibility={actualNoteViewVisibility}
      />
    </ActualNoteDetailsWrapper>
  )
}

export { SocialHxDetailClientView }
