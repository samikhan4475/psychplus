import { DiagnosisView } from '@/ui/diagnosis'

interface DiagnosisPageProps {
  params: {
    id: string
  }
}

const DiagnosisInfoPage = async ({ params }: DiagnosisPageProps) => {
  return <DiagnosisView patientId={params.id} />
}

export default DiagnosisInfoPage
