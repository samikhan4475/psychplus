import { QuickNotesView } from '@/ui/quicknotes'

interface QuickNotesPageProps {
  params: {
    id: string
  }
}

const QuickNotesPage = ({ params }: QuickNotesPageProps) => {
  return <QuickNotesView patientId={params.id} />
}

export default QuickNotesPage
