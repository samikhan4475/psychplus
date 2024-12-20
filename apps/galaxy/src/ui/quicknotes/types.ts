import { Appointment, PatientProfile } from '@/types'
import { QuickNoteSectionName } from './constants'

type WidgetType = {
  component?: React.ComponentType<{
    patientId: string
    appointmentId?: string
    appointment: Appointment
  }>
  actualNoteComponent?: React.ComponentType<{
    patientId: string
    appointmentId: string
    appointment: Appointment
    patient?: PatientProfile
    visitType: string
    visitSequence: string
  }>
  id: QuickNoteSectionName
  providerTypes?: string[]
}

export type { WidgetType }
