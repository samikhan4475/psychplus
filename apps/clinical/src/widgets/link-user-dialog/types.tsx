interface Metadata {
  createdOn: string
  createdBy: number
  createdByFullName: string
  updatedOn: string
  updatedBy: number
  updatedByFullName: string
  deletedOn: string
  deletedBy: number
  deletedByFullName: string
}

interface Name {
  firstName: string
  middleName: string
  lastName: string
  preferredName: string
  title: string
  honors: string
}

interface DriversLicense {
  type: string
  number: string
  issuedDate: string
  expirationDate: string
  issuedBy: string
  validIn: string
  hasFrontImage: boolean
  hasBackImage: boolean
}

interface Contact {
  email: string
  emailVerificationStatus: string
  phoneNumbers: { type: string; number: string }[]
  addresses: {
    type: string
    street1: string
    street2: string
    city: string
    state: string
    country: string
    postalCode: string
    geoCoordinates: {
      longitude: number
      latitude: number
      altitude: number
    }
  }[]
}

interface Guardian {
  name: Name
  isEmergencyContact: boolean
  relationship: string
  contact: Contact
}

interface EmergencyContact {
  name: Name
  relationship: string
  contact: Contact
}

interface UserDetails {
  id: number
  metadata: Metadata
  verificationStatus: string
  userId: number
  legalName: Name
  birthdate: string
  gender: string
  genderOrientation: string
  genderExpression: string
  genderPronoun: string
  driversLicense: DriversLicense
  socialSecurityNumber: string
  medicalRecordNumber: string
  chargeKey: string
  chargeUserId: string
  isPlusMember: boolean
  hasPhoto: boolean
  guardian: Guardian
  contactDetails: Contact
  emergencyContact: EmergencyContact
}

export type { UserDetails }
