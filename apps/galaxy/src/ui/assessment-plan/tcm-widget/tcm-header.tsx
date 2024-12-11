import { Flex, Text } from '@radix-ui/themes'
import { TcmSaveButton } from './tcm-save-button'

interface TcmProps {
  title: string
}

const TcmHeader = ({ title }: TcmProps) => {
  return (
    <Flex className="ml-[-10px] mr-[20px] mt-[-20px] bg-accent-3" width="102%">
      <Flex
        justify="between"
        align="center"
        className="my-1 w-full bg-[white] py-1 pl-2 pr-4"
      >
        <Text className="text-[16px] font-[600]">{title}</Text>

        <Flex className="gap-x-2 text-[20px]" align="center">
          <TcmSaveButton />
        </Flex>
      </Flex>
    </Flex>
  )
}

export { TcmHeader }
