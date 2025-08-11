import { PreEmploymentEvalView } from '@/ui/pre-employment-psych-eval'

interface Props {
  params: {
    id: string
    apptId: string
  }
}

const PreEmploymentViewPage = ({ params }: Props) => {
  return <PreEmploymentEvalView patientId={params.id} isHeader={true} />
}

export default PreEmploymentViewPage
