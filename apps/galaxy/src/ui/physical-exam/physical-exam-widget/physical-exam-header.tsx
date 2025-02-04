import { Flex, Text } from '@radix-ui/themes'
import { WidgetSaveButton } from '@/components'

const PhysicalExamHeader = () => {
  return (
    <Flex
      justify="between"
      align="center"
      className="bg-white rounded-b-[4px] rounded-t-[4px] px-2 py-1 pr-3 shadow-2"
    >
      <Text className="text-pp-black-1 flex items-center gap-x-[11px] text-[20px] font-bold">
        Physical Exam
      </Text>
      <Flex className="gap-x-2 text-[20px]" align="center">
        <WidgetSaveButton variant="filled" shouldCheckPermission />
      </Flex>
    </Flex>
  )
}

export { PhysicalExamHeader }
