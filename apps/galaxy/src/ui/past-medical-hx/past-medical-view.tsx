import { PastMedicalHxWidget } from './past-medical-hx-widget'

interface PastPsychViewProps {
  patientId: string
}

const PastMedicalHxView = ({ patientId }: PastPsychViewProps) => {
  return <PastMedicalHxWidget patientId={patientId} />
}

export { PastMedicalHxView }
