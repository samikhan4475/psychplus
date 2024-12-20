import { Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { transformIn } from '@/ui/past-medical-hx/past-medical-hx-widget/data'
import { getWidgetContainerCheckboxStateByWidgetId } from '@/utils'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type PastMedicalHxProps = {
  patientId: string
  visitType: string
  visitSequence: string
}

const PastMedicalHx = async ({
  patientId,
  visitType,
  visitSequence,
}: PastMedicalHxProps) => {
  const response = await getQuickNoteDetailAction(
    patientId,
    [QuickNoteSectionName.QuickNoteSectionPastMedicalHx],
    true,
  )

  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }
  const transformedData = transformIn(response.data)

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

export { PastMedicalHx }
