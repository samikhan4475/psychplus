import { Flex, Text } from '@radix-ui/themes'
import { WidgetSaveButton } from '@/components'

const UdsHeader = () => {
  return (
    <Flex
      justify="between"
      align="center"
      className="bg-white rounded-b-[4px] px-2 py-1 pr-3 shadow-2"
    >
      <Text className="flex items-center gap-x-[11px] text-[20px] font-bold">
        Urine Drug Screen
      </Text>
      <Flex className="gap-x-2 text-[20px]" align="center">
        <WidgetSaveButton variant="filled" />
      </Flex>
    </Flex>
  )
}

export { UdsHeader }
