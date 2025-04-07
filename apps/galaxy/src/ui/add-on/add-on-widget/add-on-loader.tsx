import { Flex, Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { getAppointment } from '@/api'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { filterAndSort } from '@/utils'
import { AddOnWidget } from './add-on-widget'
import { getBookedAppointmentApi } from './api/booked-appointments-api'
import { transformIn } from './data'

interface PatientAddOnLoaderProps {
  patientId: string
  appointmentId: string
  visitType: string
}

const AddOnLoader = async ({
  patientId,
  appointmentId,
  visitType,
}: PatientAddOnLoaderProps) => {
  const appointment = await getAppointment({ id: appointmentId })

  if (appointment.state === 'error') {
    return <Text>Appointment with {appointmentId} not found</Text>
  }

  const [response, bookedAppointmentResponse] = await Promise.all([
    getQuickNoteDetailAction(
      patientId,
      [QuickNoteSectionName.Addon],
      false,
      appointmentId,
    ),
    getBookedAppointmentApi(appointment.data),
  ])

  if (response.state === 'error') {
    return <Text>Add On Fail: {response.error}</Text>
  }

  const appointmentData =
    bookedAppointmentResponse.state === 'success'
      ? bookedAppointmentResponse.data
      : []
  const [data, otherData] = filterAndSort(
    response.data ?? [],
    'additionalTherapyDetail',
  )
  const initialValue = transformIn(data, appointmentData, visitType)

  return (
    <Flex direction="column" width="100%">
      <AddOnWidget
        patientId={patientId}
        appointment={appointment.data}
        initialValue={initialValue}
        otherData={otherData}
      />
    </Flex>
  )
}

export { AddOnLoader }
