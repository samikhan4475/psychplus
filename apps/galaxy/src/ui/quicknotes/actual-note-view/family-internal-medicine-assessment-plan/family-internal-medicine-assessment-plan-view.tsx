import { Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { transformIn } from '@/ui/assessment-plan/family-internal-medicine-assessment-plan-tab/data'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type PastPsychHxDetailsProps = {
  patientId: string
}

const FamilyInternalMedicineAssessmentPlanView = async ({
  patientId,
}: PastPsychHxDetailsProps) => {
  const response = await getQuickNoteDetailAction(patientId, [
    QuickNoteSectionName.QuicknoteSectionFamilyInternalMedicineAssessmentPlan,
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

export { FamilyInternalMedicineAssessmentPlanView }
