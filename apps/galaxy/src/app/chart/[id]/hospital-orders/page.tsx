import toast from 'react-hot-toast'
import { HospitalOrdersView } from '@/ui/hospital-orders'
import { getQuickNotesHospitalLabOrders } from '@/ui/hospital-orders/api/get-hospital-lab-orders'

interface QuestionnairesPageProps {
  params: {
    id: string
  }
}

const HospitalInfoPage = async ({ params }: QuestionnairesPageProps) => {
  const response = await getQuickNotesHospitalLabOrders({
    patientId: params.id,
  })

  if (response.state === 'error') {
    toast.error(response.error)
  }

  const data =
    response.state === 'success'
      ? response.data.quicknotesHospitalLabOrdersData
      : []

  return (
    <HospitalOrdersView
      patientId={params.id}
      quicknotesHospitalLabOrderResponse={data}
    />
  )
}

export default HospitalInfoPage
