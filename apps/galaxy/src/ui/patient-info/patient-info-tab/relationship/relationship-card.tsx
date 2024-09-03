'use client'

import { Flex } from '@radix-ui/themes'
import { CardHeading } from '@/components'

interface DescriptiveCardProps {
  patientId: string
}

const RelationshipCard = ({ patientId }: DescriptiveCardProps) => {
  return (
    <Flex direction="column" className="bg-white shadow-2">
      <CardHeading title="Relationship" />
      <Flex direction="column" px="2" gap="2">
        {/* <RelationshipTable /> */}
      </Flex>
    </Flex>
  )
}

export { RelationshipCard }
