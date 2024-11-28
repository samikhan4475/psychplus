import { Appointment } from '@/types'
import { QuickNoteSectionName } from './constants'

type WidgetType = {
  component?: React.ComponentType<{ patientId: string; appointmentId?: string }>
  actualNoteComponent?: React.ComponentType<{
    patientId: string
    appointmentId: string
    appointment?: Appointment
  }>
  id: QuickNoteSectionName
}

export type { WidgetType }
