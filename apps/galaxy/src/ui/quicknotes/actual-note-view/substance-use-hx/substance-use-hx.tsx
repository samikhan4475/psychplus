import { Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { PatientProfile } from '@/types'
import { transformIn } from '@/ui/substance-use-hx/substance-use-hx-widget/data'
import { getWidgetContainerCheckboxStateByWidgetId } from '@/utils'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

interface SubstanceUseHxProps {
  patientId: string
  appointmentId: string
  patient?: PatientProfile
  visitType: string
  visitSequence: string
}

const SubstanceUseHx = async ({
  patientId,
  patient,
  visitType,
  visitSequence,
}: SubstanceUseHxProps) => {
  const response = await getQuickNoteDetailAction(patientId, [
    QuickNoteSectionName.QuickNoteSectionSubstanceUseHx,
  ])

  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }

  const transformedData = transformIn(response.data)

  const actualNoteViewVisibility = getWidgetContainerCheckboxStateByWidgetId({
    widgetId: QuickNoteSectionName.QuickNoteSectionSubstanceUseHx,
    visitType,
    visitSequence,
    initialValue: transformedData.widgetContainerCheckboxField,
  })?.actualNoteViewVisibility

  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuickNoteSectionSubstanceUseHx}
    >
      <Details
        sectionName="Substance Use History"
        data={transformedData}
        patient={patient}
        actualNoteViewVisibility={actualNoteViewVisibility}
      />
    </ActualNoteDetailsWrapper>
  )
}

export { SubstanceUseHx }
