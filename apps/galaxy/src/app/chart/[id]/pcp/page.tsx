import { GOOGLE_MAPS_API_KEY } from '@/constants'
import { PcpServerView } from '@/ui/pcp'

interface PcpPageProps {
  params: {
    id: string
  }
}

const PcpPage = ({ params }: PcpPageProps) => {
  return (
    <PcpServerView patientId={params.id} googleApiKey={GOOGLE_MAPS_API_KEY} />
  )
}

export default PcpPage
