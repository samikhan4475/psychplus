import { MseView } from '@/ui/mse'

interface MsePageProps {
  params: {
    id: string
  }
}

const MsePage = ({ params }: MsePageProps) => {
  return <MseView patientId={params.id} />
}

export default MsePage
