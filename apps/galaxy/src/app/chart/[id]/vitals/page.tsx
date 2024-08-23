import { VitalsView } from '@/ui/vitals'

interface VitalsPageProps {
  params: {
    id: string
  }
}

const VitalsPage = ({ params }: VitalsPageProps) => {
  return <VitalsView patientId={params.id} />
}

export default VitalsPage
