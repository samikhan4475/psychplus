import { Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { Appointment } from '@/types'
import { transformIn } from '@/ui/physical-exam/physical-exam-widget/data'
import { getWidgetContainerCheckboxStateByWidgetId } from '@/utils'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type PhysicalExamProps = {
  patientId: string
  visitType: string
  visitSequence: string
  appointment: Appointment
}

const PhysicalExamView = async ({
  patientId,
  visitType,
  visitSequence,
  appointment,
}: PhysicalExamProps) => {
  const response = await getQuickNoteDetailAction(
    patientId,
    [QuickNoteSectionName.QuicknoteSectionPhysicalExam],
    true,
  )

  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }

  const transformedData = transformIn(response.data)

  const actualNoteViewVisibility = getWidgetContainerCheckboxStateByWidgetId({
    widgetId: QuickNoteSectionName.QuicknoteSectionPhysicalExam,
    visitType,
    visitSequence,
    initialValue: transformedData.widgetContainerCheckboxField,
    providerType: appointment.providerType,
  })?.actualNoteViewVisibility

  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuicknoteSectionPhysicalExam}
    >
      <Details
        data={transformedData}
        actualNoteViewVisibility={actualNoteViewVisibility}
      />
    </ActualNoteDetailsWrapper>
  )
}

export { PhysicalExamView }
