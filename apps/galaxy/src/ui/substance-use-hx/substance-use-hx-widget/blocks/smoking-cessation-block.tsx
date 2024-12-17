import { Box, Flex, Text } from '@radix-ui/themes'
import { RadioSelectSection, SelectInput } from '@/components'
import { COUNSELING_OPTIONS, SMOKING_CESSATION_OPTIONS } from './constants'

const SmokingCessationBlock = () => {
  return (
    <Flex align="center" gap="2" wrap="wrap">
      <Text size="1" className="flex h-[var(--chip-height)] items-center">
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
      <RadioSelectSection
        label="Discussed smoking cessation for"
        field="smokingCessationDiscussionDuration"
        options={[
          { label: '≥ 3 mins', value: '≥ 3 mins' },
          { label: '≥ 11 mins', value: '≥ 11 mins' },
        ]}
      />
    </Flex>
  )
}

export { SmokingCessationBlock }
