import { Flex, Text } from '@radix-ui/themes'
import { RadioGroup } from '@/components'

const MailAddressRadio = () => {
  return (
    <Flex
      className="bg-pp-bg-accent self-end rounded-2"
      px="2"
      gap="2"
      align="center"
    >
      <Text className="text-[12px]" weight="bold">
        Is your mailing address same as Primary?
      </Text>
      <RadioGroup
        className="bg-white"
        field="isMailingAddressSameAsPrimary"
        options={[
          { label: 'No', value: 'no' },
          { label: 'Yes', value: 'yes' },
        ]}
      />
    </Flex>
  )
}

export { MailAddressRadio }
