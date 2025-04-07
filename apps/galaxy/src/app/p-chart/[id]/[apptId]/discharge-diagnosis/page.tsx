import { DiagnosisView } from '@/ui/discharge-diagnosis'

interface DiagnosisPageProps {
  params: {
    id: string
    apptId: string
  }
  searchParams: {
    id: string
  }
}

const DischargeDiagnosisVisitViewPage = ({
  params,
  searchParams,
}: DiagnosisPageProps) => {
  return <DiagnosisView patientId={params.id} appointmentId={searchParams.id} />
}

export default DischargeDiagnosisVisitViewPage
