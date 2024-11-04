interface PatientProfile {
  id: string
  mrn: string
  firstName: string
  middleName?: string
  lastName: string
  dob: string
  phone?: string
  email: string
  hasGuardian: boolean
  guardianFirstName?: string
  guardianLastName?: string
}

interface PatientHistory {
  dateTime: string
  username: string
}

interface RRI {
  user: string
  dataTime: string
  status: string
}
export type { PatientProfile, PatientHistory, RRI }
