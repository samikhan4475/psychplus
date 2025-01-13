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

  if (noteAppointment.state === 'error') {
    return <Text>{noteAppointment.error}</Text>
  }
  return (
    <NotesView patientId={params.id} noteAppointment={noteAppointment.data} />
  )
}

export default NotesPage
