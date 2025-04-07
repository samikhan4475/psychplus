import { PatientReferralsView } from '@/ui/referrals'

interface PatientReferralsVisitViewPageProps {
  params: {
    id: string
    apptId:string
  }
}

const PatientReferralsVisitViewPage = ({ params }:PatientReferralsVisitViewPageProps) => {
  return <PatientReferralsView patientId={params.id} isTabView />
}

export default PatientReferralsVisitViewPage
