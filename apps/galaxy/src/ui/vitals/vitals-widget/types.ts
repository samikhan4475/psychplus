import { type Row } from '@tanstack/react-table'
import { Metadata } from '@/types'

type PatientVitalStatus = 'Active' | 'Inactive' | 'Deleted'

interface PatientVital {
  id: number
  metadata: Metadata
  recordStatus?: PatientVitalStatus
  patientId: number
  appointmentId: number
  isUsCustomaryMode: boolean
  systolic?: number
  diastolic?: number
  pulseRate?: number
  breathingRate?: number
  bodyMassIndex?: number
  bmiPercentile?: number
  pulseOximetry?: number
  oxygenConcentration?: number
  weightPounds?: number
  weightKilograms?: number
  heightCm?: number
  heightInches?: number
  heightFt?: number
  bodyTemperatureC?: number
  bodyTemperatureF?: number
  headCircumferenceCm?: number
  headCircumferenceIn?: number
  weightForLengthPercentile?: number
  headOccipitalCircumferencePercentile?: number
  additional?: string
  addToNote?: boolean
}

type PatientVitalRow = Row<PatientVital>

interface VitalsProps {
  patientId: string
  appointmentId: string
}

export type { PatientVital, PatientVitalRow, VitalsProps }
