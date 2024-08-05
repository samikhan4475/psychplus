import { type AssigningAuthorities } from '@psychplus/codeset'

interface AssigningAuthoritiesState {
  assigningAuthorities: AssigningAuthorities[]
  newAssigningAuthority: Partial<AssigningAuthorities> | null
  setAssigningAuthorities: (value: AssigningAuthorities[]) => void
  setNewAssigningAuthority: () => void
}

type AssigningAuthoritiesStoreType = AssigningAuthoritiesState

export type { AssigningAuthoritiesState, AssigningAuthoritiesStoreType }
