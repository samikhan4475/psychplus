'use client'

import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { Appointment, QuickNoteSectionItem } from '@/types'
import { transformIn } from '@/ui/mse/mse-widget/data'
import { getWidgetContainerCheckboxStateByWidgetId } from '@/utils'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type MentalStatusExamProps = {
  visitType: string
  visitSequence: string
  appointment: Appointment
  data?: QuickNoteSectionItem[]
}

const MentalStatusExamClientView = ({
  visitType,
  visitSequence,
  appointment,
  data,
}: MentalStatusExamProps) => {
  const transformedData = transformIn(data ?? [])

  const actualNoteViewVisibility = getWidgetContainerCheckboxStateByWidgetId({
    widgetId: QuickNoteSectionName.QuicknoteSectionMse,
    visitType,
    visitSequence,
    initialValue: transformedData.widgetContainerCheckboxField,
    providerType: appointment.providerType,
  })?.actualNoteViewVisibility

  const delusionTypeCodeset = useCodesetCodes(CODESETS.DelusionType)
  const hallucinationTypeCodeset = useCodesetCodes(CODESETS.HallucinationType)

  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuicknoteSectionMse}
    >
      <Details
        data={transformedData}
        actualNoteViewVisibility={actualNoteViewVisibility}
        delusionTypeCodeset={delusionTypeCodeset}
        hallucinationTypeCodeset={hallucinationTypeCodeset}
      />
    </ActualNoteDetailsWrapper>
  )
}

export { MentalStatusExamClientView }
