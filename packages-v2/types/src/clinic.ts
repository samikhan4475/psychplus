import { ClinicContactDetails } from '.'

interface Clinic {
  id: string
  name: string
  isTest?: boolean
  contact: ClinicContactDetails
}

export type { Clinic }
