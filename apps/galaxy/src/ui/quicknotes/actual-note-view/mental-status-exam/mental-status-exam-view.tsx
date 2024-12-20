import { Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { Appointment } from '@/types'
import { transformIn } from '@/ui/mse/mse-widget/data'
import { getWidgetContainerCheckboxStateByWidgetId } from '@/utils'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type MentalStatusExamProps = {
  patientId: string
  visitType: string
  visitSequence: string
  appointment: Appointment
}

const MentalStatusExam = async ({
  patientId,
  visitType,
  visitSequence,
  appointment,
}: MentalStatusExamProps) => {
  const response = await getQuickNoteDetailAction(
    patientId,
    [QuickNoteSectionName.QuicknoteSectionMse],
    true,
  )

  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }

  const transformedData = transformIn(response.data)

  const actualNoteViewVisibility = getWidgetContainerCheckboxStateByWidgetId({
    widgetId: QuickNoteSectionName.QuicknoteSectionMse,
    visitType,
    visitSequence,
    initialValue: transformedData.widgetContainerCheckboxField,
    providerType: appointment.providerType,
  })?.actualNoteViewVisibility

  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuicknoteSectionMse}
    >
      <Details
        data={transformedData}
        actualNoteViewVisibility={actualNoteViewVisibility}
      />
    </ActualNoteDetailsWrapper>
  )
}

export { MentalStatusExam }
