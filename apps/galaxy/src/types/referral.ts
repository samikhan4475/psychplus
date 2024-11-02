import { Metadata } from './metadata'
import { LegalName } from './name'

interface PatientReferral {
  id: number
  metadata?: Metadata
  patientId: number
  patientName: LegalName
  referralDate?: string
  resourceStatus?: string
  referredByType?: string
  referredByName: LegalName
  service: string
  servicesStatus: string
  contactStatus: string
  visitDateTime?: string
  comments: string
}

export type { PatientReferral }
