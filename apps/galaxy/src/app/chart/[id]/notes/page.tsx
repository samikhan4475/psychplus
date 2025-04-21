import { NotesWidgetView } from '@/ui/notes'

interface NotesPageProps {
  params: {
    id: string
    apptId: string
  }
  searchParams: {
    id: string
  }
}

const NotesPage = ({ params, searchParams }: NotesPageProps) => {
  return (
    <NotesWidgetView patientId={params.id} appointmentId={searchParams.id} />
  )
}

export default NotesPage
