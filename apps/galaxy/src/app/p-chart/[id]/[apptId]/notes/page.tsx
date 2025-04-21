import { NotesWidgetView } from '@/ui/notes'

interface NotesVisitViewPageProps {
  params: {
    id: string
    apptId: string
  }
  searchParams: {
    id: string
  }
}

const NotesVisitViewPage = ({
  params,
  searchParams,
}: NotesVisitViewPageProps) => {
  return (
    <NotesWidgetView
      patientId={params.id}
      appointmentId={searchParams?.id ?? ''}
    />
  )
}

export default NotesVisitViewPage
