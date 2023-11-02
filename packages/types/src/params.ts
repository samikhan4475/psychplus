interface SearchParams {
  [key: string]: string | undefined
}

interface TokenParams {
  token: string
}

interface PatientParams {
  patientId: string
}

export type { SearchParams, TokenParams, PatientParams }