import { Flex, Text } from '@radix-ui/themes'
import { WidgetAddButton } from '@/components'
import { FEATURE_FLAGS } from '@/constants'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { AddAllergy } from './add-allergy'
import { AddAllergyButton } from './add-allergy-button'
import { PatientAllergiesPrintButton } from './patient-allergies-print-button'

interface PhysicalExamHeaderProps {
  scriptSureAppUrl: string
}

const PatientAllergiesHeader = ({
  scriptSureAppUrl,
}: PhysicalExamHeaderProps) => {
  const isFeatureFlagEnabled = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr8973EnableDawMedicationApi,
  )
  return (
    <Flex
      justify="between"
      align="center"
      className="bg-white px-2 py-1 pr-3 shadow-2"
    >
      <Text className="flex items-center gap-x-[11px] text-[20px] font-bold">
        Allergies
      </Text>
      <Flex className="gap-x-2 text-[20px]" align="center">
        <PatientAllergiesPrintButton />
        <WidgetAddButton title="Add Allergies" className="max-w-[45vw]">
          {isFeatureFlagEnabled ? (
            <AddAllergy />
          ) : (
            <AddAllergyButton scriptSureAppUrl={scriptSureAppUrl} />
          )}
        </WidgetAddButton>
      </Flex>
    </Flex>
  )
}

export { PatientAllergiesHeader }
