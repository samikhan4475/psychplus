import { PharmacyView } from '@/ui/pharmacy'

interface PharmacyVisitViewPageProps {
  params: {
    id: string
    apptId: string
  }
}

const PharmacyVisitViewPage = ({
  params,
}: PharmacyVisitViewPageProps) => {
  return <PharmacyView patientId={params.id} />
}

export default PharmacyVisitViewPage
