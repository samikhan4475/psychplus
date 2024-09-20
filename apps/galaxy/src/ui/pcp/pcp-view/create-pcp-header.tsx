import { Flex, Text } from '@radix-ui/themes'
import { HxButton } from './hx-button'
import { SaveButton } from './save-button'

interface PcpHeaderProps {
  onClick(): void
}
const CreatePcpHeader = ({ onClick }: PcpHeaderProps) => {
  return (
    <Flex
      justify="between"
      align="center"
      className="bg-white rounded-b-[4px] rounded-t-[4px] px-2 py-1 shadow-2"
    >
      <Flex className="gap-x-[11px]" align="center">
        <Text className="text-pp-black-1 text-[20px] font-bold">
          Primary Care Physician
        </Text>
      </Flex>
      <Flex className="gap-x-2 text-[20px]" align="center">
        <HxButton toggleOpen={onClick} />
        <SaveButton />
      </Flex>
    </Flex>
  )
}

export { CreatePcpHeader }
