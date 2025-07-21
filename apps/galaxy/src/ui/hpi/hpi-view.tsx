import { getPatientStaffCommentsAction } from '@/actions'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { getAppointment } from '@/api'
import { STAFF_COMMENT_STATUS } from '@/types'
import { Flex, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import { getPatientConsentsAction } from '../patient-info/patient-info-tab/actions'
import { QuickNoteSectionName } from '../quicknotes/constants'
import { getCachedWidgetsByVisitType, getWidgetIds } from '../quicknotes/utils'
import { HpiWidget } from './hpi-widget'

interface HpiViewProps {
  patientId: string
  isHpiHeader?: boolean
  appointmentId: string
  visitType: string
  visitSequence: string
}

const HpiView = async ({ patientId, isHpiHeader, appointmentId, visitSequence, visitType }: HpiViewProps) => {
  const appointmentResult = await getAppointment({
    id: appointmentId,
    isIncludeCodes: true,
    isIncludeCosigners: true,
    isIncludeLocation: true,
    isIncludeSignedNotes: true
  })


  if (appointmentResult.state === 'error') {
    return notFound()
  }


  const widgets =
    getCachedWidgetsByVisitType(
      visitType,
      visitSequence,
      appointmentResult.data.providerType,
    ) || []

  const patientDependentWidgetsIds = getWidgetIds({
    widgets,
  })

  const patientAndAppointmentDependentWidgetsIds = getWidgetIds({
    widgets,
    isPatientAndAppointmentDependent: true,
  })

  const [
    widgetsResponse,
    consentsResult,
    codesResponse,
    appoinmentCodesResponse,
    staffComments,
  ] = await Promise.all([
    getQuickNoteDetailAction(patientId, patientDependentWidgetsIds),
    getPatientConsentsAction(patientId),
    getQuickNoteDetailAction(
      patientId,
      [QuickNoteSectionName.QuicknoteSectionCodes],
      false,
      undefined,
      true,
    ),
    getQuickNoteDetailAction(
      patientId,
      patientAndAppointmentDependentWidgetsIds,
      false,
      appointmentId,
      false,
    ),
    getPatientStaffCommentsAction({
      patientId,
      recordStatuses: [STAFF_COMMENT_STATUS.Active],
      isTreatment: true,
      isBilling: true,
    }),
  ])

  if (widgetsResponse.state === 'error') {
    return <Text>{widgetsResponse.error}</Text>
  }
  if (consentsResult.state === 'error') {
    return <div>{consentsResult.error}</div>
  }
  if (codesResponse.state === 'error') {
    return <Text>{codesResponse.error}</Text>
  }
  if (appoinmentCodesResponse.state === 'error') {
    return <Text>{appoinmentCodesResponse.error}</Text>
  }
  if (staffComments.state === 'error') {
    return <Text>{staffComments.error}</Text>
  }

  const widgetsData = [
    widgetsResponse.data ?? [],
    codesResponse.data ?? [],
    appoinmentCodesResponse.data ?? [],
  ].flat()

  return (
    <Flex direction="column" width="100%">
      <Flex direction="column" gap="2">
        <HpiWidget patientId={patientId} isHpiHeader={isHpiHeader} appointment={appointmentResult.data} widgetsData={widgetsData} appointmentId={appointmentId} />
      </Flex>
    </Flex>
  )
}

export { HpiView }
