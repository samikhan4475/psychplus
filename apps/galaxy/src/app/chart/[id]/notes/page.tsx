import { Text } from '@radix-ui/themes'
import { getAppointment } from '@/api'
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
  const noteAppointment = await getAppointment({
    id: searchParams.id,
    isIncludeCosigners: true,
  })

  const appointmentData =
    noteAppointment.state === 'error' ? undefined : noteAppointment.data
  return <NotesView patientId={params.id} noteAppointment={appointmentData} />
}

export default NotesPage
