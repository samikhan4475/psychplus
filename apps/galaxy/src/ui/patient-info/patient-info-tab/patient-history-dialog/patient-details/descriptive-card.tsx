'use client'

import { Box, Flex, Text } from '@radix-ui/themes'
import { DetailBox } from '../shared'

const DescriptiveCard = () => {
  return (
    <Flex direction="column">
      <Box className="bg-pp-table-subRows rounded-t-1" px="2">
        <Text size="2" weight="bold">
          Descriptive
        </Text>
      </Box>
      <Flex gapX="6" gapY="3" wrap="wrap" p="2">
        <DetailBox title="Preferred Name" content="John" />
        <DetailBox title="Prefix" content="Mr" />
        <DetailBox title="Suffix" content="" />
        <DetailBox title="Prof. Suffix" content="MBA" />
        <DetailBox title="Gender" content="Male" required />
        <DetailBox title="Orientation" content="....." />
        <DetailBox title="Gender Expression" content="Male" />
        <DetailBox title="Pronoun" content="He" />
        <DetailBox title="Comment" content="Call me after 8:00am" required />
        <DetailBox title="Religion" content="Islam" />
        <DetailBox title="Mother Maiden Name" content="English" />
        <DetailBox title="Language" content="English" />
        <DetailBox title="Language Ability" content="English" />
        <DetailBox title="Proficiency" content="English" />
        <DetailBox
          title="Race"
          content="Native Hawaiian or Other Pacific Islander, White"
        />
        <DetailBox title="Ethnicity" content="Not Hispanic or Latino" />
      </Flex>
    </Flex>
  )
}

export { DescriptiveCard }
