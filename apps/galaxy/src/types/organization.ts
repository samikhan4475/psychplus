import { PatientAddress } from './address'
import { Metadata } from './metadata'

interface Organization {
  id: string
  metadata?: Metadata
  shortName: string
  displayName: string
  recordStatus: string
  organizationAddress?: PatientAddress
}

export type { Organization }
