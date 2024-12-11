import { Flex, Text } from '@radix-ui/themes'
import { QuickNoteSectionItem } from '@/types'
import { AssessmentPlanTabs } from '../constants'
import { FamilyInternalMedicineAssessmentPlanSaveButton } from './family-internal-medicine-assessment-plan-save-button'

interface FamilyInternalMedicineAssessmentPlanHeaderProps {
  patientId: string
  getData: (schema: any) => QuickNoteSectionItem[]
}

const FamilyInternalMedicineAssessmentPlanHeader = ({
  patientId,
  getData,
}: FamilyInternalMedicineAssessmentPlanHeaderProps) => {
  return (
    <Flex
      justify="between"
      align="center"
      className="bg-white rounded-b-[4px] px-2 py-1 pr-3 shadow-2"
    >
      <Text className="flex items-center gap-x-[11px] text-[20px] font-bold">
        {AssessmentPlanTabs.FIMAP}
      </Text>
      <Flex className="gap-x-2 text-[20px]" align="center">
        <FamilyInternalMedicineAssessmentPlanSaveButton
          patientId={patientId}
          getData={getData}
        />
      </Flex>
    </Flex>
  )
}

export { FamilyInternalMedicineAssessmentPlanHeader }
