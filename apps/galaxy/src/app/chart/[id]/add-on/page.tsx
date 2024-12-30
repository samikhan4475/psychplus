import { Flex, Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { getAppointment } from '@/api'
import { AddOnWidget } from '@/ui/add-on/add-on-widget/add-on-widget'
import { getBookedAppointmentApi } from '@/ui/add-on/add-on-widget/api/booked-appointments-api'
import { transformIn } from '@/ui/add-on/add-on-widget/data'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

interface PatientAllergiesPageProps {
  params: {
    id: string
  }
  searchParams: {
    id: string
    visitType: string
  }
}

const PatientAllergiesPage = async ({
  params,
  searchParams,
}: PatientAllergiesPageProps) => {
  const appointmentId = searchParams.id
  const visitType = searchParams.visitType
  const appointment = await getAppointment(searchParams.id)

  if (appointment.state === 'error') {
    return <Text>Appointment with {appointmentId} not found</Text>
  }

  const [response, bookedAppointmentResponse] = await Promise.all([
    getQuickNoteDetailAction(params.id, [QuickNoteSectionName.Addon]),
    getBookedAppointmentApi(appointment.data),
  ])

  if (response.state === 'error') {
    return <Text>Add On Fail: {response.error}</Text>
  }

  const appointmentData =
    bookedAppointmentResponse.state === 'success'
      ? bookedAppointmentResponse.data
      : []

  const initialValue = transformIn(
    response.data ?? [],
    appointmentData,
    visitType,
  )

  return (
    <Flex direction="column" width="100%">
      <AddOnWidget patientId={params.id} initialValue={initialValue} />
    </Flex>
  )
}

export default PatientAllergiesPage
