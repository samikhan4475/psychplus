import { type Row } from '@tanstack/react-table'
import { Metadata } from '@/types'

type PatientVitalStatus = 'Active' | 'Inactive'

interface PatientVital {
  dateTime: string
  id: 0
  metadata: Metadata
  recordStatus: PatientVitalStatus
  patientId: number
  appointmentId: number
  isUsCustomaryMode: true
  systolic: number
  diastolic: number
  pulseRate: number
  breathingRate: number
  bodyMassIndex: number
  bmiPercentile: number
  pulseOximetry: number
  oxygenConcentration: number
  weightPounds: number
  weightKilograms: number
  heightCm: number
  heightFt: number
  bodyTemperatureC: number
  bodyTemperatureF: number
  headCircumferenceCm: number
  headCircumferenceIn: number
  weightForLengthPercentile: number
  headOccipitalCircumferencePercentile: number
  additional: string
}

type PatientVitalRow = Row<PatientVital>

interface VitalsProps {
  patientId: string
  appointmentId: string
}

export type { PatientVital, PatientVitalRow, VitalsProps }
