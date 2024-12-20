import { Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { transformIn } from '@/ui/social-hx/social-hx-widget/data'
import { getWidgetContainerCheckboxStateByWidgetId } from '@/utils'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type SocialHxDetailsProps = {
  patientId: string
  visitType: string
  visitSequence: string
}

const SocialHxDetailView = async ({
  patientId,
  visitType,
  visitSequence,
}: SocialHxDetailsProps) => {
  const response = await getQuickNoteDetailAction(patientId, [
    QuickNoteSectionName.QuickNoteSectionSocialHx,
  ])

  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }

  const transformedData = transformIn(response.data)

  const actualNoteViewVisibility = getWidgetContainerCheckboxStateByWidgetId({
    widgetId: QuickNoteSectionName.QuickNoteSectionSocialHx,
    visitType,
    visitSequence,
    initialValue: transformedData.widgetContainerCheckboxField,
  })?.actualNoteViewVisibility

  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuickNoteSectionSocialHx}
    >
      <Details
        data={transformedData}
        actualNoteViewVisibility={actualNoteViewVisibility}
      />
    </ActualNoteDetailsWrapper>
  )
}

export { SocialHxDetailView }
