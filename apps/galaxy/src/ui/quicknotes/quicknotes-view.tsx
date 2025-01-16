import { notFound } from 'next/navigation'
import { Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { getAppointment } from '@/api'
import { QuickNoteSectionName } from './constants'
import { QuickNotesClientView } from './quicknotes-client-view.tsx'
import { getCachedWidgetsByVisitType, getWidgetIds } from './utils'

interface QuickNotesViewProps {
  patientId: string
  appointmentId: string
  visitType: string
  visitSequence: string
}

const QuickNotesView = async ({
  patientId,
  appointmentId,
  visitType,
  visitSequence,
}: QuickNotesViewProps) => {
  const [appointmentResult] = await Promise.all([
    getAppointment({
      id: appointmentId,
      isIncludeCodes: true,
      isIncludeCosigners: true,
      isIncludeLocation: true,
    }),
  ])

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

  const [widgetsResponse, codesResponse, appoinmentCodesResponse] =
    await Promise.all([
      getQuickNoteDetailAction(patientId, patientDependentWidgetsIds),
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
    ])

  if (widgetsResponse.state === 'error') {
    return <Text>{widgetsResponse.error}</Text>
  }
  if (codesResponse.state === 'error') {
    return <Text>{codesResponse.error}</Text>
  }
  if (appoinmentCodesResponse.state === 'error') {
    return <Text>{appoinmentCodesResponse.error}</Text>
  }

  const widgetsData = [
    widgetsResponse.data ?? [],
    codesResponse.data ?? [],
    appoinmentCodesResponse.data ?? [],
  ].flat()

  return (
    <QuickNotesClientView
      patientId={patientId}
      appointmentId={appointmentId}
      appointment={appointmentResult.data}
      widgets={widgets}
      visitType={visitType}
      widgetsData={widgetsData}
      visitSequence={visitSequence}
    />
  )
}

export { QuickNotesView }
