import { Row } from '@tanstack/react-table'
import { Metadata } from '@/types'

interface Pharmacy {
  metadata?: Metadata
  pharmacyId: string
  pharmacyName: string
  pharmacyContactDetails: {
    phoneNumbers: [
      {
        type: string
        number: string
      },
    ]
    addresses: [
      {
        type: string
        street1: string
        street2: string
        city: string
        state: string
        country: string
        postalCode: string
      },
    ]
  }
  lastUsed: string
  isPreferred: false
}

type PharmacyRow = Row<Pharmacy>

interface GetPharmacyData {
  currentPharmacies: Pharmacy[]
}
interface PharmacyParams {
  isOnlyDefaults?: boolean
}

export type { GetPharmacyData, Pharmacy, PharmacyParams, PharmacyRow }
