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
