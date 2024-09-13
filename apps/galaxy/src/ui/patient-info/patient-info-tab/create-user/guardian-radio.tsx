import { Flex, Text } from '@radix-ui/themes'
import { RadioGroup } from '@/components'

const GuardianRadio = () => {
  return (
    <Flex
      className="bg-pp-bg-accent col-span-2 self-end rounded-1 p-2"
      gap="2"
      justify="between"
      align="center"
    >
      <Text className="text-1" weight="medium">
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
