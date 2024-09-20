'use client'

import { Flex, Text } from '@radix-ui/themes'

const PatientInfoDetail = () => {
  return (
    <Flex gap="6" align="center" className="px-2 py-2 ">
      <Flex gap="1" align="center">
        <Text size="1" weight="medium">
          Patient Name
        </Text>
        <Text size="1" color="gray">
          John Smith
        </Text>
      </Flex>
      <Flex gap="1" align="center">
        <Text size="1" weight="medium">
          Gender
        </Text>
        <Text size="1" color="gray">
          Male
        </Text>
      </Flex>
      <Flex gap="1" align="center">
        <Text size="1" weight="medium">
          DOB
        </Text>
        <Text size="1" color="gray">
          11/01/1996
        </Text>
      </Flex>
      <Flex gap="1" align="center">
        <Text size="1" weight="medium">
          Age
        </Text>
        <Text size="1" color="gray">
          28 yrs
        </Text>
      </Flex>
      <Flex gap="1" align="center">
        <Text size="1" weight="medium">
          Visit #
        </Text>
        <Text size="1" color="gray">
          0000127B-00022
        </Text>
      </Flex>
    </Flex>
  )
}

export { PatientInfoDetail }
