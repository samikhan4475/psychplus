import { Text } from '@radix-ui/themes'
import {
  getAppointment,
  getPatientAllergies,
  getPatientNotes,
  getPatientProfile,
} from '@/api'
import { NotesView } from './notes-view'

interface NotesVisitViewPageProps {
  patientId: string
  appointmentId: string
}

const NotesWidgetLoader = async ({
  patientId,
  appointmentId,
}: NotesVisitViewPageProps) => {
  const [patientNotes, noteAppointment, patientAllergies, patientProfile] =
    await Promise.all([
      getPatientNotes({ patientId: patientId }),
      getAppointment({
        id: appointmentId,
        isIncludeCosigners: true,
        isIncludeLocation: true,
      }),
      getPatientAllergies({
        payload: {
          patientIds: [patientId],
        },
      }),
      getPatientProfile(patientId),
    ])

  const appointmentData =
    noteAppointment.state === 'error' ? undefined : noteAppointment.data

  const patientNotesData =
    patientNotes.state === 'error' ? undefined : patientNotes.data

  const patientAllergiesData =
    patientAllergies.state === 'error' ? [] : patientAllergies.data

  if (patientProfile.state === 'error') {
    return <Text>{patientProfile.error}</Text>
  }

  return (
    <NotesView
      patientId={patientId}
      noteAppointment={appointmentData}
      patientNotes={patientNotesData}
      PatientProfile={patientProfile.data}
      allergies={patientAllergiesData}
    />
  )
}

export { NotesWidgetLoader }
