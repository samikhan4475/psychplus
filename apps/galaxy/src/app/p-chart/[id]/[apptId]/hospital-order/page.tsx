import { HospitalOrderWidget } from '@/ui/hospital-orders'

interface HospitalInfoVisitViewPageProps {
  params: {
    id: string
    apptId: string
  }
}

const HospitalInfoVisitViewPage = ({
  params,
}: HospitalInfoVisitViewPageProps) => {
  return <HospitalOrderWidget patientId={params.id} />
}

export default HospitalInfoVisitViewPage
