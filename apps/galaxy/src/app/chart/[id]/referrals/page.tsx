import { PatientReferralsView } from '@/ui/referrals'

interface PatientReferralsPageProps {
  params: {
    id: string
  }
}

const PatientReferralsPage = ({ params }: PatientReferralsPageProps) => {
  return <PatientReferralsView patientId={params.id} isTabView />
}

export default PatientReferralsPage
