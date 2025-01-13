import { Text } from '@radix-ui/themes'
import { getAppointment } from '@/api'
import { TherapyWidget } from '@/ui/therapy'

interface TherapyPageProps {
  params: {
    id: string
  }
  searchParams: {
    id: string
    visitType: string
  }
}

const TherapyPage = async ({ params, searchParams }: TherapyPageProps) => {
  const appointment = await getAppointment({ id: searchParams.id })
  if (appointment.state === 'error') {
    return <Text>Appointment with {searchParams.id} not found</Text>
  }
  return <TherapyWidget patientId={params.id} appointment={appointment.data} />
}

export default TherapyPage
