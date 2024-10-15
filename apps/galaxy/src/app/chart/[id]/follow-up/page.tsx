import * as api from '@/api'
import { FollowUpView } from '@/ui/follow-up'

interface FollowUpPageProps {
  params: { id: string }
}

const FollowUpPage = async ({ params }: FollowUpPageProps) => {
  return <FollowUpView patientId={params.id} />
}

export default FollowUpPage
