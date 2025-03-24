import { Flex, Text } from '@radix-ui/themes'
import { AutoResizeInput } from '@/components-v2'

const OtherBlock = () => {
  return (
    <Flex className="items-center" gap="2">
      <Text
        weight={'light'}
        className="mr-2 text-[16px] font-medium text-[#151B4A] lg:text-[18px]"
      >
        Other
      </Text>
      <AutoResizeInput field={'hpiOther'} maxLength={500} />
    </Flex>
  )
}

export { OtherBlock }
