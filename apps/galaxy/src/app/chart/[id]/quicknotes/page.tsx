import { QuickNotesView } from '@/ui/quicknotes'

interface QuickNotesPageProps {
  params: {
    id: string
  }
  searchParams: {
    id: string
  }
}

const QuickNotesPage = ({ params, searchParams }: QuickNotesPageProps) => (
  <QuickNotesView patientId={params.id} appointmentId={searchParams.id} />
)

export default QuickNotesPage
