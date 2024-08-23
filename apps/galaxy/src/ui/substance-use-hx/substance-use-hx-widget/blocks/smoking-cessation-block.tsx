import { Box, Flex, Text } from '@radix-ui/themes'
import { RadioSelectSection, SelectInput } from '@/components'

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
          options={[
            { label: 'Nicotine replacement therapy', value: 'nicotine' },
            { label: 'Varenicline (Chantix)', value: 'varenicline' },
            { label: 'Bupropion (Zyban)', value: 'bupropion' },
            { label: 'Combination therapy', value: 'combination' },
            { label: 'Other', value: 'other' },
          ]}
        />
      </Box>
      <Text size="1" className="flex h-[var(--chip-height)] items-center">
        and
      </Text>
      <Box className="ml-[-2px]">
        <SelectInput
          label="Counseling Options"
          field="counselingOption"
          options={[
            { label: 'Brief counseling', value: 'brief' },
            { label: 'Intensive counseling', value: 'intensive' },
            { label: 'Other', value: 'other' },
          ]}
        />
      </Box>
      <RadioSelectSection
        label="Discussed smoking cessation for"
        field="smokingCessationDiscussionDuration"
        options={[
          { label: '≥ 3 mins', value: '>=3m' },
          { label: '≥ 11 mins', value: '>=11m' },
        ]}
      />
    </Flex>
  )
}

export { SmokingCessationBlock }
