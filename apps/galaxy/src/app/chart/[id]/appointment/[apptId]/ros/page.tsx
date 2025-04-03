import { RosView } from '@/ui/ros'

interface RosPageProps {
  params: {
    id: string
  }
}

const RosPage = ({ params }: RosPageProps) => {
  return <RosView patientId={params.id} />
}

export default RosPage
