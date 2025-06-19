import React from 'react'
import { Box, Flex, TextArea } from '@radix-ui/themes'
import { FeatureEmpty, ReportFileIcon } from '@/components-v2'
import { TitleSection } from '../../common'
import '../../constants/texts'
import {
  fastingText,
  printText,
  psychplusText,
  questText,
} from '../../constants/texts'
import { useStore } from '../../store'

const LabInstructionsSection = () => {
  const { labOrders } = useStore((state) => ({ labOrders: state.labOrders }))

  const hasPsychplus = labOrders.some(
    (order) => order?.orderingLab?.locationName === 'PsychPlus',
  )

  const hasQuest = labOrders.some(
    (order) => order?.orderingLab?.locationName === 'Quest',
  )
  const hasPrint = labOrders.some(
    (order) => order?.orderingLab?.locationName === 'Print',
  )

  const isFasting = labOrders.some((order) => order?.isFasting)

  return (
    <Box>
      <TitleSection title="Lab Instructions" />
      <Box className="border-pp-gray-2 rounded-2 border border-solid">
        {!hasPsychplus && !hasQuest && !hasPrint && !isFasting ? (
          <FeatureEmpty
            description={'No Lab Instructions yet'}
            Icon={ReportFileIcon}
          />
        ) : (
          <Flex direction="column" gap="2" pt="2">
            {hasPsychplus && (
              <Flex className="w-[80%]" px="2" pb="2">
                <TextArea
                  size="2"
                  disabled
                  className="h-[100px] w-full"
                  value={psychplusText}
                />
              </Flex>
            )}

            {hasQuest && (
              <Flex className="w-[80%]" px="2" pb="2">
                <TextArea
                  size="2"
                  disabled
                  className="h-[180px] w-full"
                  value={questText}
                />
              </Flex>
            )}

            {hasPrint && (
              <Flex className="w-[80%]" px="2" pb="2">
                <TextArea
                  size="2"
                  disabled
                  className="h-[100px] w-full"
                  value={printText}
                />
              </Flex>
            )}

            {isFasting && (
              <Flex className="w-[80%]" px="2" pb="2">
                <TextArea
                  size="2"
                  disabled
                  className="h-[50px] w-full"
                  value={fastingText}
                />
              </Flex>
            )}
          </Flex>
        )}
      </Box>
    </Box>
  )
}

export { LabInstructionsSection }
