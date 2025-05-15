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
  widgetsData?: QuickNoteSectionItem[]
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

interface SignPayloadProps {
  patientId: string
  appointmentId: string
  signedByUserId?: number
  appointment: Appointment
  noteTypeCode?: string
  signedDate?: string
  noteTitleCode?: string
  coSignedByUserId?: string
}

export type { WidgetType, WidgetComponent, SignPayloadProps }
