import { NotesView } from '@/ui/notes'

interface NotesPageProps {
  params: {
    id: string
  }
}

const NotesPage = ({ params }: NotesPageProps) => {
  return <NotesView patientId={params.id} />
}

export default NotesPage
