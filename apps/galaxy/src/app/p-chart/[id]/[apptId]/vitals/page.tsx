import { VitalsView } from '@/ui/vitals'

interface VitalsVisitViewPageProps {
  params: {
    id: string
    apptId: string
  }
}

const VitalsVisitViewPage = ({ params }: VitalsVisitViewPageProps) => {
  return <VitalsView patientId={params.id} />
}

export default VitalsVisitViewPage
