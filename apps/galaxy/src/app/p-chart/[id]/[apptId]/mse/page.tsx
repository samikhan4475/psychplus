import { MseView } from '@/ui/mse'

interface MseVisitViewPagProps {
  params: {
    id: string
    apptId:string
  }
  searchParams: {
    id: string
  }
}

const MseVisitViewPage = ({ params, searchParams }: MseVisitViewPagProps) => {
  return <MseView patientId={params.id} appointmentId={searchParams.id} />
}

export default MseVisitViewPage
