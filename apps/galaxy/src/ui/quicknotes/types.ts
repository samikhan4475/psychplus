import { Appointment, PatientProfile } from '@/types'
import { QuickNoteSectionName } from './constants'

type WidgetType = {
  component?: React.ComponentType<{ patientId: string; appointmentId?: string }>
  actualNoteComponent?: React.ComponentType<{
    patientId: string
    appointmentId: string
    appointment?: Appointment
    patient?: PatientProfile
  }>
  id: QuickNoteSectionName
  providerTypes?: string[]
}

export type { WidgetType }
