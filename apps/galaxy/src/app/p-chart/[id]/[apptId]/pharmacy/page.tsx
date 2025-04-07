import { PharmacyView } from '@/ui/pharmacy'

interface PharmacyVisitViewPageProps {
  params: {
    id: string
    apptId: string
  }
}

const PharmacyVisitViewPage = async ({
  params,
}: PharmacyVisitViewPageProps) => {
  return <PharmacyView patientId={params.id} />
}

export default PharmacyVisitViewPage
