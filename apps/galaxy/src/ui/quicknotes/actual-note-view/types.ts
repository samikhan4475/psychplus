import { Appointment, PatientProfile, QuickNoteSectionItem } from '@/types'
interface Allergy {
  allergyName: string
  allergyType: string
  reaction: string
  severityCode: string
  onsetBegan: string
  onsetEnded: string
}

interface NoteDetailProps {
  isNoteView: boolean
  allergies?: Allergy[]
  data: QuickNoteSectionItem[]
  appointments?: Appointment[]
  appointment?: Appointment
  patientId: string
  appointmentId: string
  patient?: PatientProfile
  groupedData?: Record<string, QuickNoteSectionItem[]>
  visitSequence: string
  visitType: string
}

export type { NoteDetailProps, Allergy }
