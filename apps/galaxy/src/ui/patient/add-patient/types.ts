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

interface PatientResponse {
  accessToken: string
  user: {
    id: number
    username: string
    legalName: {
      firstName: string
      middleName: string
      lastName: string
    }
    userRoleCode: string
    contactInfo: {
      email: string
      phoneNumbers: [
        {
          type: string
          number: string
        },
      ]
    }
    staffId: number
    patientId: number
  }
}

export type { PatientBody, PatientResponse }
