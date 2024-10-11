'use client'

import { Box, Flex, Text } from '@radix-ui/themes'
import { LabelledText } from '../shared'
import { useStore } from '../store'

const AlternativeInfoCard = () => {
  const { selectedRow } = useStore((state) => ({
    selectedRow: state?.selectedRow,
  }))
  const AlternateInfoAddress =
    selectedRow?.alternateOrPreviousContactDetails?.addresses?.find(
      (address) => address?.type === 'Home',
    )
  return (
    <Flex direction="column">
      <Box className="bg-pp-table-subRows rounded-t-1" px="2">
        <Text size="2" weight="bold">
          Alternate/Previous info
        </Text>
      </Box>
      <Flex gapX="4" gapY="3" wrap="wrap" p="2">
        <LabelledText
          title="First Name"
          content={selectedRow?.alternateOrPreviousName?.firstName}
        />
        <LabelledText
          title="Middle Name"
          content={selectedRow?.alternateOrPreviousName?.middleName}
        />
        <LabelledText
          title="Last Name"
          content={selectedRow?.alternateOrPreviousName?.lastName}
        />
        <LabelledText
          title="Prefix"
          content={selectedRow?.alternateOrPreviousName?.title}
        />
        <LabelledText
          title="Suffix"
          content={selectedRow?.alternateOrPreviousName?.suffix}
        />
        <LabelledText
          title="Prof. Suffix"
          content={selectedRow?.alternateOrPreviousName?.honors}
        />
        <LabelledText
          title="Address Line 1"
          content={AlternateInfoAddress?.street1}
        />
        <LabelledText
          title="Address Line 2"
          content={AlternateInfoAddress?.street2}
        />
        <LabelledText title="City" content={AlternateInfoAddress?.city} />
        <LabelledText title="State" content={AlternateInfoAddress?.state} />
        <LabelledText title="Zip" content={AlternateInfoAddress?.postalCode} />
      </Flex>
    </Flex>
  )
}

export { AlternativeInfoCard }
