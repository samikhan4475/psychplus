'use client'

import { Flex } from '@radix-ui/themes'
import { CardHeading } from '@/components'
import { Relationship } from '@/types'
import { RelationshipTable } from './relationship-table'

interface RelationshipCardProps {
  patientRelationships: Relationship[]
}

const RelationshipCard = ({ patientRelationships }: RelationshipCardProps) => {
  return (
    <Flex direction="column" className="bg-white overflow-hidden rounded-1">
      <CardHeading title="Relationship" />
      <Flex direction="column" p="2" gap="2">
        <RelationshipTable patientRelationships={patientRelationships} />
      </Flex>
    </Flex>
  )
}

export { RelationshipCard }
