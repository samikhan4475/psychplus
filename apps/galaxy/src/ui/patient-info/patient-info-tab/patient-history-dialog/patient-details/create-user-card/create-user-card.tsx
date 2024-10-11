'use client'

import { Box, Flex, Text } from '@radix-ui/themes'
import { LabelledText } from '../../shared'
import { useStore } from '../../store'
import { PatientPolicyStatus } from './patient-policy-status'

interface CreateUserCardProps {
  patientPolicyAStatus?: string
}
const CreateUserCard = ({ patientPolicyAStatus }: CreateUserCardProps) => {
  const { selectedRow } = useStore((state) => ({
    selectedRow: state.selectedRow,
  }))
  const contactNumber = selectedRow?.contactDetails?.phoneNumbers?.find(
    (number) => number.type === 'Contact',
  )?.number
  return (
    <Flex direction="column">
      <Box className="bg-pp-table-subRows rounded-t-1" px="2">
        <Text size="2" weight="bold">
          Create User
        </Text>
      </Box>
      <Flex gapX="4" gapY="3" wrap="wrap" p="2" align="start">
        <LabelledText
          required
          content={selectedRow?.legalName?.firstName}
          title="First Name"
        />
        <LabelledText
          content={selectedRow?.legalName?.middleName}
          title="Middle Name"
        />
        <LabelledText
          content={selectedRow?.legalName?.lastName}
          title="Last Name"
          required
        />
        <LabelledText
          content={selectedRow?.birthdate}
          title="Date of Birth"
          required
        />
        <LabelledText content={contactNumber} title="Phone Number" required />
        <LabelledText
          content={selectedRow?.contactDetails?.email}
          title="Email"
          required
        />
        <LabelledText
          content={selectedRow?.hasGuardian ? 'Yes' : 'No'}
          title="Guardian (Do you have a Parent/Guardian?)"
          required
        />
        {selectedRow?.hasGuardian && (
          <>
            <LabelledText
              content={selectedRow?.guardian?.name?.firstName}
              title="Guardian First Name"
              required
            />
            <LabelledText
              content={selectedRow?.guardian?.name?.lastName}
              title="Guardian Last Name"
              required
            />
          </>
        )}
        <PatientPolicyStatus patientPolicyAStatus={patientPolicyAStatus} />
      </Flex>
    </Flex>
  )
}

export { CreateUserCard }
