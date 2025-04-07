import { FollowUpView } from '@/ui/follow-up'

interface FollowUpPageProps {
  params: { id: string; apptId: string }
}

const FollowUpVisitViewPage = async ({ params }: FollowUpPageProps) => {
  return <FollowUpView patientId={params.id} />
}

export default FollowUpVisitViewPage
