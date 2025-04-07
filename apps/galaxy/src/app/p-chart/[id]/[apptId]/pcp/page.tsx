import { GOOGLE_MAPS_API_KEY } from '@/constants'
import { PcpServerView } from '@/ui/pcp'

interface PcpVisitViewPageProps {
  params: {
    id: string
    apptId:string
  }
}

const PcpVisitViewPage = ({ params }: PcpVisitViewPageProps) => {
  return (
    <PcpServerView patientId={params.id} googleApiKey={GOOGLE_MAPS_API_KEY} />
  )
}

export default PcpVisitViewPage
