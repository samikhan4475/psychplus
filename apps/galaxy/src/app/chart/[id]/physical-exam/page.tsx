import { PhysicalExamView } from '@/ui/physical-exam'

interface PhysicalExamPageProps {
  params: {
    id: string
  }
}

const PhysicalExamPage = ({ params }: PhysicalExamPageProps) => {
  return <PhysicalExamView patientId={params.id} />
}

export default PhysicalExamPage
