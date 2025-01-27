import { ContactDetails, Metadata } from '@psychplus-v2/types'

interface Pharmacy {
  id: string
  metadata: Metadata
  name: string
  pharmacyOrganizationId: string
  npi: string
  ncpdpId: string
  healthIdentificationNumber: string
  directorySpecialistName: string
  serviceLevel: string[]
  contactDetails: ContactDetails
  enabledDateFrom: string
  enabledDateTo: string
  resourceStatus: string
}

export { type Pharmacy }
