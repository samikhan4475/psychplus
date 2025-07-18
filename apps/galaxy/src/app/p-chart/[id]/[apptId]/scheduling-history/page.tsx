import { SchedulingHistoryView } from '@/ui/scheduling-history'

interface SchedulingHistoryPageProps {
  params: {
    id: string
    apptId: string
  }
}

const SchedulingHistoryVisitViewPage = ({
  params,
}: SchedulingHistoryPageProps) => {
  return <SchedulingHistoryView patientId={params.id} />
}

export default SchedulingHistoryVisitViewPage
