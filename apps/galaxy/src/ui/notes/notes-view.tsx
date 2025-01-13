import { Appointment } from '@/types'
import { NotesWidget } from './notes-widget'

interface NotesViewProps {
  patientId: string
  noteAppointment: Appointment
}

const NotesView = ({ patientId, noteAppointment }: NotesViewProps) => {
  return <NotesWidget patientId={patientId} noteAppointment={noteAppointment} />
}

export { NotesView }
