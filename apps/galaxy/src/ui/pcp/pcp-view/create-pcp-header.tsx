import { Flex, Text } from '@radix-ui/themes'
import { SaveButton } from './save-button'

interface PcpHeaderProps {
  patientId: string
}
const CreatePcpHeader = ({ patientId }: PcpHeaderProps) => {
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
        <SaveButton />
      </Flex>
    </Flex>
  )
}

export { CreatePcpHeader }
