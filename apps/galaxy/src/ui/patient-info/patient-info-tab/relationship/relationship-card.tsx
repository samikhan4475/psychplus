'use client'

import { useMemo, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { CardHeading } from '@/components'
import { Relationship } from '@/types'
import { AddRelationshipDialog } from '../add-relationship-dialog'
import { PatientRelationshipContext } from './context'
import { RelationshipTable } from './relationship-table'

interface RelationshipCardProps {
  patientRelationships: Relationship[]
  patientId: string
}

const RelationshipCard = ({
  patientRelationships,
  patientId,
}: RelationshipCardProps) => {
  const [relationships, setRelationships] = useState<Relationship[]>(
    patientRelationships ?? [],
  )
  const ctxValue = useMemo(
    () => ({
      relationships,
      setRelationships,
    }),
    [relationships],
  )
  return (
    <Flex direction="column" className="bg-white overflow-hidden rounded-1">
      <PatientRelationshipContext.Provider value={ctxValue}>
        <CardHeading title="Relationship">
          <Flex justify="end" flexGrow="1">
            <AddRelationshipDialog patientId={patientId} />
          </Flex>
        </CardHeading>
        <Flex direction="column" p="2" gap="2">
          <RelationshipTable patientRelationships={relationships} />
        </Flex>
      </PatientRelationshipContext.Provider>
    </Flex>
  )
}

export { RelationshipCard }
