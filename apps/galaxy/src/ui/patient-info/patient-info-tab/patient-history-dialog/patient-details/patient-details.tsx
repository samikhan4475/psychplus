'use client'

import { Flex, ScrollArea, Text } from '@radix-ui/themes'
import { useStore } from '../store'
import { AdditionalInfoCard } from './additional-info-card'
import { AddressCard } from './address'
import { AlternativeInfoCard } from './alternative-info-card'
import { CreateUserCard } from './create-user-card'
import { DescriptiveCard } from './descriptive-card'
import { PatientDataCard } from './patient-data'

interface PatientDetailsProps {
  patientId: string
  patientPolicyAStatus?: string
}
const PatientDetails = ({
  patientId,
  patientPolicyAStatus,
}: PatientDetailsProps) => {
  const { selectedRow } = useStore((store) => ({
    selectedRow: store.selectedRow,
  }))
  if (!selectedRow) {
    return (
      <Flex className="h-full w-full" justify="center" align="center">
        <Text size="2" weight="bold">
          No row selected
        </Text>
      </Flex>
    )
  }
  return (
    <ScrollArea className="h-full w-full pr-2" scrollbars="vertical">
      <CreateUserCard patientPolicyAStatus={patientPolicyAStatus} />
      <PatientDataCard patientId={patientId} />
      <AddressCard />
      <AdditionalInfoCard />
      <AlternativeInfoCard />
      <DescriptiveCard />
    </ScrollArea>
  )
}

export { PatientDetails }
