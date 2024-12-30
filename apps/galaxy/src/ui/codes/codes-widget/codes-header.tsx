import { Flex, Text } from '@radix-ui/themes'
import { WidgetTabSaveButton } from '@/components'

const CodesHeader = () => {
  return (
    <Flex
      justify="between"
      align="center"
      className="bg-white rounded-b-[4px] rounded-t-[4px] px-2 py-1 pr-3 shadow-2"
    >
      <Flex className="gap-x-8 text-[20px]" align="center">
        <Text className="text-pp-black-1 flex items-center gap-x-[11px] text-[20px] font-bold">
          Codes
        </Text>
      </Flex>

      <Flex className="gap-x-2 text-[20px]" align="center">
        <WidgetTabSaveButton />
      </Flex>
    </Flex>
  )
}

export { CodesHeader }
