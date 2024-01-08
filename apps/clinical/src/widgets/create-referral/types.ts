interface ReferredByName {
  firstName: string
  lastName: string
  honors?: string
}

interface Metadata {
  createdOn: string
}

interface Referral {
  service: string
  resourceStatus: string
  metadata: Metadata
}

export type { Referral, ReferredByName }
