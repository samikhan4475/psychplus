interface Patient {
  id: number
  firstName: string
  lastName: string
  fullName: string
  dob: string
  age: number
  phone: string
  email: string
  addressLine1: string
}

interface PatientParams {
  patientId: string
}

export type { Patient, PatientParams }
