import { Flex, Text } from '@radix-ui/themes'
import { TextInput } from '@/components-v2/text-input'

const OtherBlock = () => {
  return (
    <Flex className="items-center" gap="2">
      <Text
        weight={'light'}
        className="mr-2 text-[16px] font-medium text-[#151B4A] lg:text-[18px]"
      >
        Other
      </Text>
      <TextInput
        field="hpiOther"
        className="border-gray-300 rounded-md focus:ring-blue-500 border px-3 py-2 transition-all duration-200 focus:outline-none focus:ring-2"
      />
    </Flex>
  )
}

export { OtherBlock }
