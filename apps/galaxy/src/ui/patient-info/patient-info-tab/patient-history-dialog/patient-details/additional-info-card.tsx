'use client'

import { Box, Flex, Text } from '@radix-ui/themes'
import { LabelledText } from '../shared'
import { useStore } from '../store'

const AdditionalInfoCard = () => {
  const { selectedRow } = useStore((state) => ({
    selectedRow: state.selectedRow,
  }))
  const homeNumber = selectedRow?.contactDetails?.phoneNumbers?.find(
    (number) => number.type === 'Home',
  )
  const workNumber = selectedRow?.contactDetails?.phoneNumbers?.find(
    (number) => number.type === 'Business',
  )
  return (
    <Flex direction="column">
      <Box className="bg-pp-table-subRows rounded-t-1" px="2">
        <Text size="2" weight="bold">
          Additional Contact Info
        </Text>
      </Box>
      <Flex gapX="4" gapY="3" wrap="wrap" p="2">
        <LabelledText title="Home Phone" content={homeNumber?.number} />
        <LabelledText title="Ext" content={homeNumber?.extension} />
        <LabelledText title="Comment" content={homeNumber?.comment} />
        <LabelledText title="Home Phone" content={workNumber?.number} />
        <LabelledText title="Ext" content={workNumber?.extension} />
        <LabelledText title="Comment" content={workNumber?.comment} />
      </Flex>
    </Flex>
  )
}

export { AdditionalInfoCard }
