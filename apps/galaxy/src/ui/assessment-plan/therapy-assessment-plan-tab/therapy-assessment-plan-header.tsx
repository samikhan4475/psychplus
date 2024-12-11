import { Flex, Text } from '@radix-ui/themes'
import { QuickNoteSectionItem } from '@/types'
import { AssessmentPlanTabs } from '../constants'
import { TherapyAssessmentPlanSaveButton } from './therapy-assessment-plan-save-button'

interface PhysicalExamHeaderProps {
  patientId: string
  getData: (schema: any) => QuickNoteSectionItem[]
}

const TherapyAssessmentPlanHeader = ({
  patientId,
  getData,
}: PhysicalExamHeaderProps) => {
  return (
    <Flex
      justify="between"
      align="center"
      className="bg-white rounded-b-[4px] px-2 py-1 pr-3 shadow-2"
    >
      <Text className="flex items-center gap-x-[11px] text-[20px] font-bold">
        {AssessmentPlanTabs.TAP}
      </Text>
      <Flex className="gap-x-2 text-[20px]" align="center">
        <TherapyAssessmentPlanSaveButton
          patientId={patientId}
          getData={getData}
        />
      </Flex>
    </Flex>
  )
}

export { TherapyAssessmentPlanHeader }
