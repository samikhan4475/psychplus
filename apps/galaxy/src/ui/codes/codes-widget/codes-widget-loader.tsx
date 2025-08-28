import { Flex, Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { getAppointment } from '@/api'
import {
  getQuestionnairesAddToNotes,
  getQuestionnairesHistories,
} from '@/ui/questionnaires/questionnaires-widget/actions'
import {
  transformAddToNotesData,
  transformHistories,
} from '@/ui/questionnaires/questionnaires-widget/data'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { transformIn as substanceTransformIn } from '@/ui/substance-use-hx/substance-use-hx-widget/data'
import { CodesWidget } from './codes-widget'
import { transformInAppointmentCodes } from './data'
import { countQuestionnaireSections, getSectionItems } from './utils'

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
    questionnairesHistoriesResult,
  ] = await Promise.all([
    getQuickNoteDetailAction(
      patientId,
      [
        QuickNoteSectionName.QuicknoteSectionCodes,
        QuickNoteSectionName.QuickNoteSectionSubstanceUseHx,
      ],
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
    getQuestionnairesAddToNotes({ patientId, appointmentId }),
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

  if (questionnairesHistoriesResult.state === 'error') {
    return <Text>{questionnairesHistoriesResult.error}</Text>
  }
  const initialValues = transformInAppointmentCodes(
    getSectionItems(
      codesResult.data,
      QuickNoteSectionName.QuicknoteSectionCodes,
    ),
    appointmentCodeResult.data,
  )

  const questionairesCount = countQuestionnaireSections({
    addedToNotes: transformAddToNotesData(questionairesResult.data),
    histories: transformHistories(questionnairesHistoriesResult.data),
    substanceData: substanceTransformIn(
      getSectionItems(
        codesResult.data,
        QuickNoteSectionName.QuickNoteSectionSubstanceUseHx,
      ),
    ),
  })

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
