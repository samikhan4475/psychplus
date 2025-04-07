import { DiagnosisView } from '@/ui/diagnosis'

interface DiagnosisInfoVisitViewPageProps {
  params: {
    id: string
    apptId: string
  }
}

const DiagnosisInfoVisitViewPage = ({
  params,
}: DiagnosisInfoVisitViewPageProps) => {
  return <DiagnosisView patientId={params.id} />
}

export default DiagnosisInfoVisitViewPage
