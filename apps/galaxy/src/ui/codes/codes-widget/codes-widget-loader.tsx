import { Flex, Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { getAppointment } from '@/api'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { CodesWidget } from './codes-widget'
import { transformInAppointmentCodes } from './data'

interface CodesWidgetLoaderProps {
  patientId: string
  appointmentId?: string
  isCodesHeader?: boolean
}

const CodesWidgetLoader = async ({
  patientId,
  appointmentId,
  isCodesHeader,
}: CodesWidgetLoaderProps) => {
  const [codesResult, appointmentCodeResult, appointmentResult] =
    await Promise.all([
      getQuickNoteDetailAction(patientId, [
        QuickNoteSectionName.QuicknoteSectionCodes,
      ]),

      getQuickNoteDetailAction(
        patientId,
        [QuickNoteSectionName.QuicknoteSectionCodes],
        appointmentId,
      ),

      getAppointment(appointmentId as string),
    ])

  if (codesResult.state === 'error') {
    return <Text>{codesResult.error}</Text>
  }

  if (appointmentCodeResult.state === 'error') {
    return <Text>{appointmentCodeResult.error}</Text>
  }

  if (appointmentResult.state === 'error') {
    return <Text>{appointmentResult.error}</Text>
  }

  const initialValues = transformInAppointmentCodes(
    codesResult.data,
    appointmentCodeResult.data,
  )

  return (
    <Flex direction="column" width="100%">
      <Flex direction="column" gap="2">
        <CodesWidget
          patientId={patientId}
          initialValues={initialValues}
          appointmentId={appointmentId}
          appointment={appointmentResult.data}
          isCodesHeader={isCodesHeader}
        />
      </Flex>
    </Flex>
  )
}

export { CodesWidgetLoader }
