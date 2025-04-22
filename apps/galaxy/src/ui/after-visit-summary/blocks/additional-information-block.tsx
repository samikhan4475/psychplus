import { Flex, Text, TextArea } from '@radix-ui/themes'
import { additionalInformationDefaultText } from '../constants/texts'

const AdditionalInformationBlock = () => {
  return (
    <Flex
      direction="column"
      gap="2"
      className="bg-white my-2 border border-gray-5"
    >
      <Flex justify="between" align="center" pt="2" px="2">
        <Text className="text-[16px] font-bold text-accent-12">
          Additional Information
        </Text>
      </Flex>

      <Flex width="80%" px="2" pb="2">
        <TextArea
          size="2"
          disabled={true}
          className="h-[1320px] w-full"
          value={additionalInformationDefaultText}
        />
      </Flex>
    </Flex>
  )
}

export { AdditionalInformationBlock }
