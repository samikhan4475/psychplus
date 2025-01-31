'use client'

import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
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
  const counsellingCodeset = useCodesetCodes(CODESETS.CounsellingOptions)
  const tobaccoTreatmentCodeset = useCodesetCodes(CODESETS.TobaccoTreatment)
  const referralTreatmentCodeset = useCodesetCodes(CODESETS.ReferralTreatment)

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
      counsellingCodeset={counsellingCodeset}
      tobaccoTreatmentCodeset={tobaccoTreatmentCodeset}
      referralTreatmentCodeset={referralTreatmentCodeset}
    />
  )
}

export { SubstanceUseHxNoteDetailView }
