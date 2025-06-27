import { Metadata } from '@/types'

type Patient = {
  patientId: number
  patientName: {
    firstName: string
    middleName?: string
    lastName: string
  }
  patientState: string
  isPrimary: boolean
  recordStatus: string
  treatmentTeamId: number
  providerType: string
  metadata: Metadata
}

export type { Patient }
