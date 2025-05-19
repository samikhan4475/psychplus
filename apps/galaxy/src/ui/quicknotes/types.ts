import { Appointment, DiagnosisIcd10Code, PatientProfile, QuickNoteSectionItem } from '@/types'
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

interface ValidateDiagnosisParams {
  workingDiagnosisData: DiagnosisIcd10Code[]
  visitType: string
  encounterNoteDx: QuickNoteSectionItem[]
  setActualNoteData: (
    data: QuickNoteSectionItem[],
    overwriteExisting?: boolean,
  ) => void
  patientId: string
  appointmentId: string
  isHospitalDischarge: boolean
}

export type { WidgetType, WidgetComponent, SignPayloadProps ,ValidateDiagnosisParams}
