import toast from 'react-hot-toast'
import { HospitalView } from '@/ui/hospital'
import { getQuickNotesHospitalLabOrders } from '@/ui/hospital/api/get-hospital-lab-orders'

interface QuestionnairesPageProps {
  params: {
    id: string
  }
}

const HospitalInfoPage = async ({ params }: QuestionnairesPageProps) => {
  return <HospitalView patientId={params.id} />
}

export default HospitalInfoPage
