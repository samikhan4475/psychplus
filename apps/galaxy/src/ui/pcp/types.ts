import { PatientAddress } from '@/types/address'
import { Metadata } from '@/types/metadata'
import { LegalName } from '@/types/name'
import { PhoneNumber } from '@/types/phone'

interface PcpViewProps {
  patientId: string
  googleApiKey: string
}

export interface PcpViewWithInitialValueProps {
  patientId: string
  googleApiKey: string
  initialValue?: ExternalProvider
}

export type PhoneNumberType = 'Contact' | 'Home' | 'Business'

export interface ContactDetails {
  phoneNumbers: PhoneNumber[]
  email: string
  isMailingAddressSameAsPrimary?: boolean
  addresses: PatientAddress[]
}

export interface ExternalProvider {
  id?: string
  legalName: LegalName
  contactDetails: ContactDetails
  isMailingAddressSameAsHome?: boolean
  metadata?: Metadata
  recordStatus?: string
}
export interface ServerSearchSelectID {
  id?: string | number
}

export interface PcpHistoryParams {
  createdFrom?: string | null
  createdTo?: string | null
  createdBy?: string
}

export type ExternalProviderDetail = {
  externalProviderId: string
  metadata: Metadata
  recordStatus: string
  patientId: string
  relationship: string
  externalProvider: ExternalProvider
}

export type { PcpViewProps }
