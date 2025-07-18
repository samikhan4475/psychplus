import { SchedulingHistoryView } from '@/ui/scheduling-history'

interface SchedulingHistoryPageProps {
  params: {
    id: string
  }
}

const SchedulingHistoryPage = ({ params }: SchedulingHistoryPageProps) => {
  return <SchedulingHistoryView patientId={params.id} />
}

export default SchedulingHistoryPage
