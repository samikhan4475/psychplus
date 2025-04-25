import { Flex, Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { getAppointment } from '@/api'
import { getQuestionnairesHistories } from '@/ui/questionnaires/questionnaires-widget/actions'
import { transformHistories } from '@/ui/questionnaires/questionnaires-widget/data'
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
  const [
    codesResult,
    appointmentCodeResult,
    appointmentResult,
    questionairesResult,
  ] = await Promise.all([
    getQuickNoteDetailAction(
      patientId,
      [QuickNoteSectionName.QuicknoteSectionCodes],
      false,
      undefined,
      true,
    ),
    getQuickNoteDetailAction(
      patientId,
      [QuickNoteSectionName.QuicknoteSectionCodes],
      false,
      appointmentId,
      false,
    ),
    getAppointment({
      id: appointmentId as string,
      isIncludeCodes: true,
      isIncludeCosigners: true,
      isIncludeLocation: true,
    }),
    getQuestionnairesHistories({ patientId }),
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

  if (questionairesResult.state === 'error') {
    return <Text>{questionairesResult.error}</Text>
  }

  const initialValues = transformInAppointmentCodes(
    codesResult.data,
    appointmentCodeResult.data,
  )
  const questionairesCount = Object.keys(
    transformHistories(questionairesResult.data),
  )?.length

  return (
    <Flex direction="column" width="100%">
      <Flex direction="column" gap="2">
        <CodesWidget
          patientId={patientId}
          initialValues={initialValues}
          questionairesCount={questionairesCount}
          appointmentId={appointmentId}
          appointment={appointmentResult.data}
          isCodesHeader={isCodesHeader}
        />
      </Flex>
    </Flex>
  )
}

export { CodesWidgetLoader }
