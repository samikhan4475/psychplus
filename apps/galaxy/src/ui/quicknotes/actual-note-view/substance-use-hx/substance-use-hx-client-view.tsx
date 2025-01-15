'use client'

import { PatientProfile, QuickNoteSectionItem } from '@/types'
import { transformIn } from '@/ui/substance-use-hx/substance-use-hx-widget/data'
import { getWidgetContainerCheckboxStateByWidgetId } from '@/utils'
import { QuickNoteSectionName } from '../../constants'
import { Details } from './details'

interface SubstanceUseHxProps {
  patient?: PatientProfile
  visitType: string
  visitSequence: string
  data?: QuickNoteSectionItem[]
}

const SubstanceUseHxClientView = ({
  data,
  patient,
  visitType,
  visitSequence,
}: SubstanceUseHxProps) => {
  const transformedData = transformIn(data ?? [])

  const actualNoteViewVisibility = getWidgetContainerCheckboxStateByWidgetId({
    widgetId: QuickNoteSectionName.QuickNoteSectionSubstanceUseHx,
    visitType,
    visitSequence,
    initialValue: transformedData.widgetContainerCheckboxField,
  })?.actualNoteViewVisibility

  return (
    // <ActualNoteDetailsWrapper
    //   sectionName={QuickNoteSectionName.QuickNoteSectionSubstanceUseHx}
    // >
    <Details
      sectionName="Substance Use History"
      data={transformedData}
      patient={patient}
      actualNoteViewVisibility={actualNoteViewVisibility}
    />
    // </ActualNoteDetailsWrapper>
  )
}

export { SubstanceUseHxClientView }
