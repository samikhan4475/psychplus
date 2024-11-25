import { HpiView } from '@/ui/hpi'

interface HpiPageProps {
  params: {
    id: string
  }
}

const HpiPage = ({ params }: HpiPageProps) => {
  return <HpiView patientId={params.id} isHpiHeader={true} />
}

export default HpiPage
