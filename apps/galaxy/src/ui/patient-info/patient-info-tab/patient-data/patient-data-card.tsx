'use client'

import { Flex } from '@radix-ui/themes'
import { CardHeading } from '@/components'

interface DescriptiveCardProps {
  patientId: string
}

const PatientDataCard = ({ patientId }: DescriptiveCardProps) => {
  return (
    <Flex direction="column" className="bg-white shadow-2">
      <CardHeading title="Patient Data" />
      <Flex direction="column" px="2" py="2" gap="2">
        <Flex align="start" gap="2"></Flex>
      </Flex>
    </Flex>
  )
}

export { PatientDataCard }
