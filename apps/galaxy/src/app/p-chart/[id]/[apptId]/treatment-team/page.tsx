import { TreatmentTeamView } from '@/ui/treatment-team'

interface TreatmentTeamPageProps {
  params: {
    id: string
  }
}

const TreatmentTeamPage = ({ params }: TreatmentTeamPageProps) => {
  const { id: patientId } = params
  return <TreatmentTeamView patientId={patientId} />
}

export default TreatmentTeamPage
