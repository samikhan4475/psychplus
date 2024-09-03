import { Flex, Text } from '@radix-ui/themes'
import { RadioGroup } from '@/components'

const GuardianRadio = () => {
  return (
    <Flex className="bg-pp-bg-accent self-end rounded-2 p-2" gap="2">
      <Text className="text-[12px]" weight="medium">
        Guardian (Do you have a Parent/Guardian?)
      </Text>
      <RadioGroup
        className="bg-white"
        field="hasGuardian"
        options={[
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
        ]}
      />
    </Flex>
  )
}

export { GuardianRadio }
