import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { TcmWidget } from './tcm-widget'
import { Text } from '@radix-ui/themes'
import { getBookedAppointmentApi } from '@/ui/add-on/add-on-widget/api/booked-appointments-api'
import { getBookedAppointmentsAction } from '@/ui/schedule/actions'

interface TcmWidgetLoaderProps {
  patientId: string
  appointmentId?: string
  isTcmTab?: boolean
}

const TcmWidgetLoader = async ({
  patientId,
  appointmentId,
  isTcmTab = false,
}: TcmWidgetLoaderProps) => {
  const [response, appointmentResult] = await Promise.all([
    api.POST<QuickNoteSectionItem[]>(api.NOTE_DETAILS_SEARCH_ENDPOINT, {
      patientId: Number(patientId),
      sectionName: [QuickNoteSectionName.QuicknoteSectionTcm],
      isLatest: true,
    }),
    await getBookedAppointmentsAction({
      patientIds: [Number(patientId)],
      appointmentIds: [Number(appointmentId)],
    }) 
   ])


  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }

  if (appointmentResult && appointmentResult.state === 'error') {
    return <Text>{appointmentResult.error}</Text>
  }

  return (
    <TcmWidget
      patientId={patientId}
      tcmData={response?.data}
      appointmentData={appointmentResult?.data[0]} 
      isTcmTab={isTcmTab}
    />
  )
}

export { TcmWidgetLoader }
