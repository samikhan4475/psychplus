import { SelectInput } from '@/components-v2/select-input'
import { Box, Flex, Text } from '@radix-ui/themes'


const SMOKING_CESSATION_OPTIONS = [
  { label: 'Nicotine Replacement', value: 'nicotine' },
  { label: 'Wellbutrin', value: 'wellbutrin' },
  { label: 'Chantix', value: 'Chantix' },
  { label: 'Patient Refused', value: 'patientRefused' },
  { label: 'Counseling', value: 'counseling' },
]

const COUNSELING_OPTIONS = [
  { label: 'Individual Counseling', value: 'individual' },
  { label: 'Group counseling', value: 'group' },
  { label: 'Online Program', value: 'online' },
  { label: '1-800-QUIT-NOW', value: 'quitNow' },
  { label: 'Patient Refused', value: 'patientRefused' },
]

const SmokingCessationBlock = () => {
  return (
    <Flex align="center" gap="2" wrap="wrap">
      <Text size="2" className="flex h-[var(--chip-height)] items-center">
        I have reviewed the risks of continued smoking with the patient and
        offered
      </Text>
      <Box className="ml-[-2px]">
        <SelectInput
          label="Smoking Cessation Options"
          field="smokingCessationOption"
          options={SMOKING_CESSATION_OPTIONS}
        />
      </Box>
      <Text size="1" className="flex h-[var(--chip-height)] items-center">
        and
      </Text>
      <Box className="ml-[-2px]">
        <SelectInput
          label="Counseling Options"
          field="counselingOption"
          options={COUNSELING_OPTIONS}
        />
      </Box>
    </Flex>
  )
}

export { SmokingCessationBlock }
