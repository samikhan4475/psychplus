import toast from 'react-hot-toast'
import { DiagnosisView } from '@/ui/diagnosis'
import { getQuickNotesWorkingDiagnosis } from '@/ui/diagnosis/diagnosis/api/get-working-diagnosis'

interface DiagnosisPageProps {
  params: {
    id: string
  }
}

const DiagnosisInfoPage = async ({ params }: DiagnosisPageProps) => {
  const response = await getQuickNotesWorkingDiagnosis({ patientId: params.id })
  if (response.state === 'error') {
    toast.error('Failed to fetch working diagnosis')
  }

  return <DiagnosisView patientId={params.id} />
}

export default DiagnosisInfoPage
