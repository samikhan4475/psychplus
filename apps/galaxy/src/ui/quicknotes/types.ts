import { QuickNoteSectionName } from './constants'

type WidgetType = {
  component?: React.ComponentType<{ patientId: string; appointmentId?: string }>
  actualNoteComponent?: React.ComponentType<{
    patientId: string
    appointmentId: string
  }>
  id: QuickNoteSectionName
}

export type { WidgetType }
