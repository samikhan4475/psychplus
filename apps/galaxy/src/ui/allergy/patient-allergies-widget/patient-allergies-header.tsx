import { Flex, Text } from '@radix-ui/themes'
import { PatientAllergiesAddButton } from './patient-allergies-add-button'
import { PatientAllergiesPrintButton } from './patient-allergies-print-button'

interface PhysicalExamHeaderProps {
  patientId: string
}

const PatientAllergiesHeader = ({ patientId }: PhysicalExamHeaderProps) => {
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
        <PatientAllergiesAddButton />
      </Flex>
    </Flex>
  )
}

export { PatientAllergiesHeader }
