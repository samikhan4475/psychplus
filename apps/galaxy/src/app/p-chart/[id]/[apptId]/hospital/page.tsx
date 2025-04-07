import { HospitalWidgetView } from '@/ui/hospital'

interface HospitalInfoVisitViewPageProps {
  params: {
    id: string
    apptId: string
  }
}

const HospitalInfoVisitViewPage = ({
  params,
}: HospitalInfoVisitViewPageProps) => {
  return <HospitalWidgetView patientId={params.id} />
}

export default HospitalInfoVisitViewPage
