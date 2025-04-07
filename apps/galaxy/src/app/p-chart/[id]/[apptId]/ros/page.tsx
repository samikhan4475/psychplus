import { RosView } from '@/ui/ros'

interface RosVisitViewPageProps {
  params: {
    id: string
    apptId:string
  }
}

const RosVisitViewPage = ({ params }: RosVisitViewPageProps) => {
  return <RosView patientId={params.id} />
}

export default RosVisitViewPage
