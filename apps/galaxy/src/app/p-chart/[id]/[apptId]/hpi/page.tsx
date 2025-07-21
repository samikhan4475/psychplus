import { HpiView } from '@/ui/hpi'

interface HpiVisitViewPageProps {
  params: {
    id: string
    apptId: string
  }
  searchParams: {
    id: string
    visitType: string
    visitSequence: string
  }
}

const HpiVisitViewPage = ({ params, searchParams: { id, visitSequence, visitType }, }: HpiVisitViewPageProps) => {
  return <HpiView patientId={params.id} isHpiHeader={true} appointmentId={id} visitSequence={visitSequence} visitType={visitType} />
}

export default HpiVisitViewPage
