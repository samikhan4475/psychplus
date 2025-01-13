import { Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { Appointment } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { AddOnWidget } from './add-on-widget'
import { getBookedAppointmentApi } from './api/booked-appointments-api'
import { transformIn } from './data'

interface AddOnLoaderProps {
  patientId: string
  appointment?: Appointment
  visitType: string
}

const AddOnLoader = async ({
  patientId,
  appointment,
  visitType,
}: AddOnLoaderProps) => {
  const [response, appointmentResponse] = await Promise.all([
    getQuickNoteDetailAction(patientId, [QuickNoteSectionName.Addon]),
    getBookedAppointmentApi(appointment),
  ])

  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }
  const appointmentData =
    appointmentResponse.state === 'success' ? appointmentResponse.data : []

  const initialValue = transformIn(
    response.state === 'success' ? response.data : [],
    appointmentData,
    visitType,
  )

  return (
    <AddOnWidget
      patientId={patientId}
      appointment={appointment}
      initialValue={initialValue}
    />
  )
}

export { AddOnLoader }
