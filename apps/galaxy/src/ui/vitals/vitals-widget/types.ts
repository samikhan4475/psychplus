import { type Row } from '@tanstack/react-table'

type PatientVitalStatus = 'active' | 'inactive'

interface PatientVital {
  dateTime: string
  bp: string
  hr: string
  rr: string
  temp: string
  weight: string
  height: string
  hc: string
  pulseOximetry: string
  oxygenConcentration: string
  bmi: string
  status: PatientVitalStatus
  addToNote: boolean
}

type PatientVitalRow = Row<PatientVital>

interface GetPatientVitalsResponse {
  vitals: PatientVital[]
  total: number
}

export type { GetPatientVitalsResponse, PatientVital, PatientVitalRow }
