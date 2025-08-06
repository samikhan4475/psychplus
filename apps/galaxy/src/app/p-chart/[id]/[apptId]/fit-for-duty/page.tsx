import { FitForDutyPsychEvalView } from '@/ui/fit-for-duty-psych-eval'

interface Props {
  params: {
    id: string
    apptId: string
  }
}

const FitForDutyPsychEvalViewPage = ({ params }: Props) => {
  return <FitForDutyPsychEvalView patientId={params.id} isHeader={true} />
}

export default FitForDutyPsychEvalViewPage
