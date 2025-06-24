import { AutoResizeInput } from '@/components-v2'
import { Flex, Text } from '@radix-ui/themes'

const OtherBlock = () => {
  return (
    <Flex align={{ initial: 'start', md: 'center' }} direction={{ initial: 'column', md: 'row' }} gap="2">
      <Text
        weight={'light'}
        className="mr-2 text-[16px] font-medium text-[#151B4A] lg:text-[18px] text-left md:text-center"
      >
        Other
      </Text>
      <AutoResizeInput field={'hpiOther'} maxLength={500} />
    </Flex>
  )
}

export { OtherBlock }
