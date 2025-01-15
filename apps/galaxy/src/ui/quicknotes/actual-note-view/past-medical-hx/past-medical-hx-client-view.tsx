'use client'

import { QuickNoteSectionItem } from '@/types'
import { transformIn } from '@/ui/past-medical-hx/past-medical-hx-widget/data'
import { getWidgetContainerCheckboxStateByWidgetId } from '@/utils'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type PastMedicalHxProps = {
  visitType: string
  visitSequence: string
  data?: QuickNoteSectionItem[]
}

const PastMedicalHxClientView = ({
  visitType,
  visitSequence,
  data,
}: PastMedicalHxProps) => {
  const transformedData = transformIn(data ?? [])

  const actualNoteViewVisibility = getWidgetContainerCheckboxStateByWidgetId({
    widgetId: QuickNoteSectionName.QuickNoteSectionPastMedicalHx,
    visitType,
    visitSequence,
    initialValue: transformedData.widgetContainerCheckboxField,
  })?.actualNoteViewVisibility

  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuickNoteSectionPastMedicalHx}
    >
      <Details
        data={transformedData}
        actualNoteViewVisibility={actualNoteViewVisibility}
      />
    </ActualNoteDetailsWrapper>
  )
}

export { PastMedicalHxClientView }
