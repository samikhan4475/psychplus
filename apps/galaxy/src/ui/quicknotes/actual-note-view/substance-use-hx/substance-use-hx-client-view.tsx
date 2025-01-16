'use client'

import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
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

  const counsellingCodeset = useCodesetCodes(CODESETS.CounsellingOptions)
  const tobaccoTreatmentCodeset = useCodesetCodes(CODESETS.TobaccoTreatment)
  const referralTreatmentCodeset = useCodesetCodes(CODESETS.ReferralTreatment)

  return (
    // <ActualNoteDetailsWrapper
    //   sectionName={QuickNoteSectionName.QuickNoteSectionSubstanceUseHx}
    // >
    <Details
      sectionName="Substance Use History"
      data={transformedData}
      patient={patient}
      actualNoteViewVisibility={actualNoteViewVisibility}
      counsellingCodeset={counsellingCodeset}
      tobaccoTreatmentCodeset={tobaccoTreatmentCodeset}
      referralTreatmentCodeset={referralTreatmentCodeset}
    />
    // </ActualNoteDetailsWrapper>
  )
}

export { SubstanceUseHxClientView }
