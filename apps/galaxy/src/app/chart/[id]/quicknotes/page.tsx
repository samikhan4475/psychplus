import { QuickNotesView } from '@/ui/quicknotes'

export const dynamic = 'force-dynamic' // Ensures the component is always fresh
export const revalidate = 0 // Disables Next.js caching
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
