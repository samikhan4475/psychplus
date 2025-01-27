import { Text } from '@radix-ui/themes'
import {
  getAppointment,
  getPatientAllergies,
  getPatientNotes,
  getPatientProfile,
} from '@/api'
import { NotesView } from '@/ui/notes'

interface NotesPageProps {
  params: {
    id: string
  }
  searchParams: {
    id: string
  }
}

const NotesPage = async ({ params, searchParams }: NotesPageProps) => {
  const [patientNotes, noteAppointment, patientAllergies, patientProfile] =
    await Promise.all([
      getPatientNotes({ patientId: params.id }),
      getAppointment({
        id: searchParams.id,
        isIncludeCosigners: true,
        isIncludeLocation: true,
      }),
      getPatientAllergies({
        payload: {
          patientIds: [params.id],
        },
      }),
      getPatientProfile(params.id),
    ])

  const appointmentData =
    noteAppointment.state === 'error' ? undefined : noteAppointment.data

  const patientNotesData =
    patientNotes.state === 'error' ? [] : patientNotes.data.notes

  const patientAllergiesData =
    patientAllergies.state === 'error' ? [] : patientAllergies.data

  if (patientProfile.state === 'error') {
    return <Text>{patientProfile.error}</Text>
  }

  return (
    <NotesView
      patientId={params.id}
      noteAppointment={appointmentData}
      patientNotes={patientNotesData}
      PatientProfile={patientProfile.data}
      allergies={patientAllergiesData}
    />
  )
}

export default NotesPage
