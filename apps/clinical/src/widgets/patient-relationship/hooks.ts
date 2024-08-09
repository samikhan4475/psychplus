import { useEffect, useMemo, useState } from 'react'
import memoize from 'micro-memoize'
import { CODE_NOT_SET, RelationshipCodeSet } from '@psychplus/codeset'
import { usePubsub } from '@psychplus/utils/event'
import {
  EVENT_LOCK_PATIENT_RELATIONSHIPS,
  EVENT_RELATIONSHIP_CREATED,
  EVENT_RELATIONSHIP_DELETED,
  EVENT_RELATIONSHIP_UPDATED,
} from '@psychplus/widgets/events'
import { getPatientRelationships } from './api.client'
import { useStore } from './store'

const useRefetchRelationships = (patientId: number) => {
  const { subscribe } = usePubsub()
  const setPatientRelationships = useStore(
    (state) => state.setPatientRelationships,
  )
  const refetch = useMemo(
    () => () => {
      getPatientRelationships(patientId).then(setPatientRelationships)
    },
    [setPatientRelationships, patientId],
  )

  useEffect(() => {
    return subscribe(EVENT_RELATIONSHIP_CREATED, refetch)
  }, [refetch, subscribe])

  useEffect(() => {
    return subscribe(EVENT_RELATIONSHIP_UPDATED, refetch)
  }, [refetch, subscribe])

  useEffect(() => {
    return subscribe(EVENT_RELATIONSHIP_DELETED, refetch)
  }, [refetch, subscribe])
}

type RelationshipCodesetIndex = { [key: string]: string | undefined }
const computeRelationshipCodesIndex = memoize((codeSet: RelationshipCodeSet) =>
  codeSet.codes
    .filter((code) => code.code !== CODE_NOT_SET)
    .reduce(
      (acc, code) => ({
        [code.code]: code.displayName,
        ...acc,
      }),
      {} as RelationshipCodesetIndex,
    ),
)

const useLockPage = () => {
  const { subscribe } = usePubsub()
  const [isLocked, setIsLocked] = useState<boolean>(false)


  useEffect(() => {
    return subscribe(EVENT_LOCK_PATIENT_RELATIONSHIPS, (data: boolean) => {
      setIsLocked(data)
    })
  }, [subscribe])

  return { isLocked }
}

const useRelationshipCodesIndex = () =>
  computeRelationshipCodesIndex(useStore((state) => state.relationshipsCodeset))

export { useRefetchRelationships, useRelationshipCodesIndex, useLockPage }
