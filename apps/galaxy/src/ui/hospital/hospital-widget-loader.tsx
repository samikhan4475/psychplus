import { Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { HospitalView } from './hospital-view'

interface HospitalWidgetLoaderProps {
  patientId: string
}

const HospitalWidgetLoader = async ({ patientId }: HospitalWidgetLoaderProps) => {
  const [hospitalInitialResponse, hospitalDischargeResponse] =
    await Promise.all([
      getQuickNoteDetailAction(patientId, [
        QuickNoteSectionName.QuickNoteSectionHospitalInitial,
      ]),

      getQuickNoteDetailAction(patientId, [
        QuickNoteSectionName.QuicknoteSectionHospitalDischarge,
      ]),
    ])

  if (hospitalInitialResponse.state === 'error')
    return <Text>{hospitalInitialResponse.error}</Text>

  if (hospitalDischargeResponse.state === 'error')
    return <Text>{hospitalDischargeResponse.error}</Text>

  return (
    <HospitalView
      patientId={patientId}
      hospitalInitialData={hospitalInitialResponse.data}
      hospitalDischargeData={hospitalDischargeResponse.data}
    />
  )
}

export { HospitalWidgetLoader }
