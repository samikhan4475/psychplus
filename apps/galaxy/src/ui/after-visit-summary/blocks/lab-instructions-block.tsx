import { Flex, Text, TextArea } from '@radix-ui/themes'
import { LabOrders } from '@/types'
import {
  psychplusText,
  questText,
  printText,
  fastingText,
} from '../constants/texts'

type LabInstructionsBlockProps = {
  labOrders: LabOrders[]
}

const LabInstructionsBlock = ({ labOrders }: LabInstructionsBlockProps) => {
  const hasPsychplus = labOrders.some(
    (order) => order.orderingLab?.locationName === 'PsychPlus',
  )

  const hasQuest = labOrders.some(
    (order) => order.orderingLab?.locationName === 'Quest',
  )
  const hasPrint = labOrders.some(
    (order) => order.orderingLab?.locationName === 'Print',
  )

  const isFasting = labOrders.some((order) => order.isFasting)

  if (!hasPsychplus && !hasQuest && !hasPrint && !isFasting) {
    return <Flex />
  }

  return (
    <Flex
      direction="column"
      gap="2"
      className="bg-white my-2 border border-gray-5"
    >
      <Flex justify="between" align="center" pt="2" px="2">
        <Text className="text-[16px] font-[600] text-accent-12">
          Lab Instructions
        </Text>
      </Flex>

      {hasPsychplus && (
        <Flex width="80%" px="2" pb="2">
          <TextArea
            size="2"
            disabled
            className="h-[100px] w-full"
            value={psychplusText}
          />
        </Flex>
      )}

      {hasQuest && (
        <Flex width="80%" px="2" pb="2">
          <TextArea
            size="2"
            disabled
            className="h-[180px] w-full"
            value={questText}
          />
        </Flex>
      )}

      {hasPrint && (
        <Flex width="80%" px="2" pb="2">
          <TextArea
            size="2"
            disabled
            className="h-[100px] w-full"
            value={printText}
          />
        </Flex>
      )}

      {isFasting && (
        <Flex width="80%" px="2" pb="2">
          <TextArea
            size="2"
            disabled
            className="h-[50px] w-full"
            value={fastingText}
          />
        </Flex>
      )}
    </Flex>
  )
}

export { LabInstructionsBlock }
