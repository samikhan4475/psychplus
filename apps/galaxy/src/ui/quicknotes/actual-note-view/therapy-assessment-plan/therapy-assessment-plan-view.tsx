import { Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { transformIn } from '@/ui/assessment-plan/therapy-assessment-plan-tab/data'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

interface TherapyAssessmentPlanViewProps {
  patientId: string
}

const TherapyAssessmentPlanView = async ({
  patientId,
}: TherapyAssessmentPlanViewProps) => {
  const response = await getQuickNoteDetailAction(patientId, [
    QuickNoteSectionName.QuicknoteSectionTherapyAssessmentPlan,
  ])

  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }

  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuickNoteSectionPastPsychHx}
    >
      <Details data={transformIn(response.data)} />
    </ActualNoteDetailsWrapper>
  )
}

export { TherapyAssessmentPlanView }
