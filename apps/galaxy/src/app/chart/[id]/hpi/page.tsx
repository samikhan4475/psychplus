import { HpiView } from '@/ui/hpi'

interface HpiPageProps {
  params: {
    id: string
  }
}

const HpiPage = ({ params }: HpiPageProps) => {
  return <HpiView patientId={params.id} />
}

export default HpiPage
