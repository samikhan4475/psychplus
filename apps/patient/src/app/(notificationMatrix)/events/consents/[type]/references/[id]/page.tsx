import { PolicyType } from '@psychplus-v2/types'
import { PatientsConsentsView } from '@/events/consents'

interface PatientsConsentsProps {
  params: { type: PolicyType; id: string }
}

const PatientsConsentsPage = ({ params }: PatientsConsentsProps) => (
  <PatientsConsentsView policyType={params.type} referenceId={params.id} />
)

export default PatientsConsentsPage
