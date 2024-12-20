import { Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { transformIn } from '@/ui/family-psych-hx/family-psych-hx-widget/data'
import { getWidgetContainerCheckboxStateByWidgetId } from '@/utils'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type PastPsychHxDetailsProps = {
  patientId: string
  visitType: string
  visitSequence: string
}

const FamilyPsychDetailView = async ({
  patientId,
  visitType,
  visitSequence,
}: PastPsychHxDetailsProps) => {
  const response = await getQuickNoteDetailAction(
    patientId,
    [QuickNoteSectionName.QuickNoteSectionFamilyPsychHx],
    true,
  )

  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }

  const transformedData = transformIn(response.data)

  const actualNoteViewVisibility = getWidgetContainerCheckboxStateByWidgetId({
    widgetId: QuickNoteSectionName.QuickNoteSectionFamilyPsychHx,
    visitType,
    visitSequence,
    initialValue: transformedData.widgetContainerCheckboxField,
  })?.actualNoteViewVisibility

  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuickNoteSectionFamilyPsychHx}
    >
      <Details
        data={transformedData}
        actualNoteViewVisibility={actualNoteViewVisibility}
      />
    </ActualNoteDetailsWrapper>
  )
}

export { FamilyPsychDetailView }
