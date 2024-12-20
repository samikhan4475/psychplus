import { Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { transformIn } from '@/ui/past-psych-hx/past-psych-hx-widget/data'
import { getWidgetContainerCheckboxStateByWidgetId } from '@/utils'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type PastPsychHxDetailsProps = {
  patientId: string
  appointmentId: string
  visitType: string
  visitSequence: string
}

const PastPsychlDetailView = async ({
  patientId,
  visitType,
  visitSequence,
}: PastPsychHxDetailsProps) => {
  const response = await getQuickNoteDetailAction(
    patientId,
    [QuickNoteSectionName.QuickNoteSectionPastPsychHx],
    true,
  )

  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }

  const transformedData = transformIn(response.data)

  const actualNoteViewVisibility = getWidgetContainerCheckboxStateByWidgetId({
    widgetId: QuickNoteSectionName.QuickNoteSectionPastPsychHx,
    visitType,
    visitSequence,
    initialValue: transformedData.widgetContainerCheckboxField,
  })?.actualNoteViewVisibility

  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuickNoteSectionPastPsychHx}
    >
      <Details
        data={transformedData}
        actualNoteViewVisibility={actualNoteViewVisibility}
      />
    </ActualNoteDetailsWrapper>
  )
}

export { PastPsychlDetailView }
