'use client'

import { useEffect, useMemo, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { CardHeading } from '@/components'
import { Relationship } from '@/types'
import { AddRelationshipDialog } from '../add-relationship-dialog'
import { PatientRelationshipContext } from './context'
import { RelationshipTable } from './relationship-table'

interface RelationshipCardProps {
  patientRelationships: Relationship[]
  patientId: string
  title?: string
}

const RelationshipCard = ({
  patientRelationships,
  patientId,
  title= "Relationship"
}: RelationshipCardProps) => {
  const [relationships, setRelationships] = useState<Relationship[]>(
    patientRelationships ?? [],
  )
  const [loading, setLoading] = useState(false)
  const ctxValue = useMemo(
    () => ({
      relationships,
      setRelationships,
      setLoading,
    }),
    [relationships],
  )
  useEffect(() => {
    setRelationships(patientRelationships)
  }, [patientRelationships])
  return (
    <Flex direction="column" className="bg-white overflow-hidden rounded-1">
      <PatientRelationshipContext.Provider value={ctxValue}>
        <CardHeading title={title}>
          <Flex justify="end" flexGrow="1">
            <AddRelationshipDialog patientId={patientId} />
          </Flex>
        </CardHeading>
        <Flex direction="column" p="2" gap="2">
          <RelationshipTable
            patientRelationships={relationships}
            loading={loading}
          />
        </Flex>
      </PatientRelationshipContext.Provider>
    </Flex>
  )
}

export { RelationshipCard }
