'use client'

import { Box, Flex, Text } from '@radix-ui/themes'
import { DetailBox } from '../../shared'
import { PatientPolicyCheckbox } from './patient-policy-checkbox'

const CreateUserCard = () => {
  return (
    <Flex direction="column">
      <Box className="bg-pp-table-subRows rounded-t-1" px="2">
        <Text size="2" weight="bold">
          Create User
        </Text>
      </Box>
      <Flex gapX="4" gapY="3" wrap="wrap" p="2" align="start">
        <DetailBox title="First Name" content="John" required />
        <DetailBox title="Middle Name" content="John" required />
        <DetailBox title="Last Name" content="John" required />
        <DetailBox title="Date of Birth" content="12/11/1994" required />
        <DetailBox title="Phone Number" content="362728282828" required />
        <DetailBox title="Email" content="john@corner.com" required />
        <DetailBox
          title="Guardian (Do you have a Parent/Guardian?)"
          content="Yes"
          required
        />
        <DetailBox title="Guardian First Name" content="John" required />
        <DetailBox title="Guardian Last Name" content="John" required />
        <PatientPolicyCheckbox />
      </Flex>
    </Flex>
  )
}

export { CreateUserCard }
