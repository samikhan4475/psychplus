import { PhysicalExamView } from '@/ui/physical-exam'

interface PhysicalExamVisitViewPageProps {
  params: {
    id: string
    apptId:string
  }
}

const PhysicalExamVisitViewPPage = ({ params }: PhysicalExamVisitViewPageProps) => {
  return <PhysicalExamView patientId={params.id} />
}

export default PhysicalExamVisitViewPPage
