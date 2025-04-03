import { PharmacyView } from '@/ui/pharmacy'

interface PharmacyPageProps {
  params: {
    id: string
  }
}

const PharmacyPage = async ({ params }: PharmacyPageProps) => {
  return <PharmacyView patientId={params.id} />
}

export default PharmacyPage
