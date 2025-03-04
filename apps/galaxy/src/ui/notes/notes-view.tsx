import { Appointment, PatientProfile } from '@/types'
import { Allergy } from '../quicknotes/actual-note-view/types'
import { NotesWidget } from './notes-widget'
import { GetPatientNotesResponse } from './types'

interface NotesViewProps {
  patientId?: string
  noteAppointment?: Appointment
  patientNotes: GetPatientNotesResponse | undefined
  PatientProfile?: PatientProfile
  allergies?: Allergy[]
  loading?: boolean
  isInboxNotes?: boolean
  tab?: string
}

const NotesView = ({
  patientId,
  noteAppointment,
  patientNotes,
  PatientProfile,
  allergies,
  loading = false,
  isInboxNotes = false,
  tab = undefined,
}: NotesViewProps) => {
  return (
    <NotesWidget
      patientId={patientId}
      noteAppointment={noteAppointment}
      patientNotes={patientNotes}
      PatientProfile={PatientProfile}
      allergies={allergies}
      isInboxNotes={isInboxNotes}
      loading={loading}
      tab={tab}
    />
  )
}

export { NotesView }
