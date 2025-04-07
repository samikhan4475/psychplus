import { HpiView } from '@/ui/hpi'

interface HpiVisitViewPageProps {
  params: {
    id: string
    apptId:string
  }
}

const HpiVisitViewPage = ({ params }: HpiVisitViewPageProps) => {
  return <HpiView patientId={params.id} isHpiHeader={true} />
}

export default HpiVisitViewPage
