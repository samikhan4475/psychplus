import { Appointment, PatientProfile, QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from './constants'

type WidgetComponent = React.ComponentType<{
  patientId: string
  appointmentId: string
  appointment: Appointment
  data?: QuickNoteSectionItem[]
  patient: PatientProfile
  visitType: string
  visitSequence: string
}>
type WidgetType = {
  component?: WidgetComponent
  actualNoteComponent?: WidgetComponent
  id: QuickNoteSectionName
  providerTypes?: string[]
  isClient?: boolean
  sectionNames?: string[]
  isPatientAndAppointmentDependent?: boolean
}

export type { WidgetType, WidgetComponent }
