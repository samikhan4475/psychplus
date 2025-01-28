interface PatientBody {
  legalName: {
    firstName: string
    middleName?: string
    lastName: string
  }
  dateOfBirth: string
  gender: string
  contactInfo: {
    email: string
    addresses?: {
      type: string
      street1: string
      street2: string
      city: string
      state: string
      country: string
      postalCode: string
    }[]
    isMailingAddressSameAsPrimary: boolean
    phoneNumbers: Array<{
      type: string
      number: string
    }>
  }
  password?: string
  guardian?: {
    name: {
      firstName?: string
      lastName?: string
    }
    relationship?: string
  }
}

export type { PatientBody }
