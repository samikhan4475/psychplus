interface Metadata {
  createdOn: string
  createdByFullName: string
}

interface ReferredByName {
  avatar?: string
  firstName: string
  lastName: string
  title?: string
  honors?: string
}

interface PatientName {
  firstName: string
  lastName: string
}

interface Referral {
  id: string
  patientId: number
  patientName: PatientName
  service: string
  referralDate: string
  visitDateTime?: string
  servicesStatus: string
  resourceStatus: string
  referredByType: string
  referredByName?: ReferredByName
  contactStatus: string
  comments: string
  metadata: Metadata
}

export type { Referral, ReferredByName }
