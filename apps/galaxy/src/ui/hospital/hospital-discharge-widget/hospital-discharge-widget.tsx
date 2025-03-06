import { Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { HospitalDischargeTab } from './hospital-discharge-tab'

interface HospitalDischargeWidgetProps {
  patientId: string
  isHospitalDischargeTab?: boolean
}

const HospitalDischargeWidget = async ({
  patientId,
  isHospitalDischargeTab = false,
}: HospitalDischargeWidgetProps) => {
  const [response, initialDataResponse] = await Promise.all([
    getQuickNoteDetailAction(patientId, [QuickNoteSectionName.QuicknoteSectionHospitalDischarge]),
    getQuickNoteDetailAction(patientId, [QuickNoteSectionName.QuickNoteSectionHospitalInitial]),
  ])

  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }

  if (initialDataResponse.state === 'error') {
    return <Text>{initialDataResponse.error}</Text>
  }

  return (
    <HospitalDischargeTab
      patientId={patientId}
      isHospitalDischargeTab={isHospitalDischargeTab}
      hospitalDischargeData={response.data}
      hospitalInitialData={initialDataResponse.data}
    />
  )
}

export { HospitalDischargeWidget }
