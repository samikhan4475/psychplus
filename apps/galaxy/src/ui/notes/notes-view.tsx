import { Appointment, PatientProfile } from '@/types'
import { Allergy } from '../quicknotes/actual-note-view/types'
import { NotesWidget } from './notes-widget'
import { PatientNotes } from './types'

interface NotesViewProps {
  patientId: string
  noteAppointment?: Appointment
  patientNotes: PatientNotes[]
  PatientProfile: PatientProfile
  allergies: Allergy[]
}

const NotesView = ({
  patientId,
  noteAppointment,
  patientNotes,
  PatientProfile,
  allergies,
}: NotesViewProps) => {
  return (
    <NotesWidget
      patientId={patientId}
      noteAppointment={noteAppointment}
      patientNotes={patientNotes}
      PatientProfile={PatientProfile}
      allergies={allergies}
    />
  )
}

export { NotesView }
