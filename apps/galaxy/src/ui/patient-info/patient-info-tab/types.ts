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

export type { PatientProfile }
