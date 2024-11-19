import { QuickNotesView } from '@/ui/quicknotes'

interface QuickNotesPageProps {
  params: {
    id: string
  }
  searchParams: {
    id: string
    visitType: string
    visitSequence: string
  }
}

const QuickNotesPage = ({
  params,
  searchParams: { id, visitType, visitSequence },
}: QuickNotesPageProps) => (
  <QuickNotesView
    patientId={params.id}
    appointmentId={id}
    visitType={visitType}
    visitSequence={visitSequence}
  />
)

export default QuickNotesPage
