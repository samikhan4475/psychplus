import { Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { saveWidgetAction } from '@/actions/save-widget'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { transformIn, transformOut } from './data'
import { QuicknotesVitalsWidget } from './quicknotes-vitals-widget'
import { getPatientVitalsAction } from './vitals-widget/actions'
import { filterVitalsWithin48Hours } from './vitals-widget/utils'

interface HospitalInitialWidgetLoaderProps {
  patientId: string
  appointmentId?: string
}

const VitalsWidgetLoader = async ({
  patientId,
  appointmentId,
}: HospitalInitialWidgetLoaderProps) => {
  if (!appointmentId) return

  const response = await getQuickNoteDetailAction(
    patientId,
    [QuickNoteSectionName.Vitals],
    false,
    appointmentId,
  )

  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }

  const vitalsIds = transformIn(response.data).vitalsId

  const result = await getPatientVitalsAction({
    payload: {
      appointmentId: Number(appointmentId),
      patientId: patientId,
    },
  })

  if (result.state === 'error') {
    return <Text>{result.error}</Text>
  }

  if (vitalsIds.length === 0 && result.data.length > 0) {
    const vitalsWithin48Hours = filterVitalsWithin48Hours(result.data)

    const selectedVitalIds =
      vitalsWithin48Hours?.map((item) => String(item.id)) ?? []

    const payload = transformOut(
      patientId,
      appointmentId,
    )({
      vitalsId: selectedVitalIds,
    })

    await saveWidgetAction({ patientId, data: payload })
  }

  return (
    <QuicknotesVitalsWidget
      patientId={patientId}
      appointmentId={appointmentId}
      quicknoteData={result.data.filter((vital) =>
        vitalsIds.includes(String(vital.id)),
      )}
      data={result.data}
    />
  )
}

export { VitalsWidgetLoader }
