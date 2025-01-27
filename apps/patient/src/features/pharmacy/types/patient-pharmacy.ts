import { ContactDetails } from '@psychplus-v2/types'

interface PatientPharmacy {
  pharmacyId: string
  externalPharmacyId: string
  pharmacyName: string
  pharmacyContactDetails: ContactDetails
  lastUsed: string
  isPreferred: boolean
  geoCoordinates: {
    longitude: number
    latitude: number
    altitude: number
  }
  isFavorite: boolean
}

export { type PatientPharmacy }
