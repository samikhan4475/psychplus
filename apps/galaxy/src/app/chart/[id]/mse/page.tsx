import { MseView } from '@/ui/mse'

interface MsePageProps {
  params: {
    id: string
  }
  searchParams: {
    id: string
  }
}

const MsePage = ({ params, searchParams }: MsePageProps) => {
  return <MseView patientId={params.id} appointmentId={searchParams.id} />
}

export default MsePage
