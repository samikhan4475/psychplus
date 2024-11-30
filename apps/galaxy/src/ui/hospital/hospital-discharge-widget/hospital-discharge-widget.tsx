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
  const response = await getQuickNoteDetailAction(patientId, [
    QuickNoteSectionName.QuicknoteSectionHospitalDischarge,
  ])

  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }

  return (
    <HospitalDischargeTab
      patientId={patientId}
      isHospitalDischargeTab={isHospitalDischargeTab}
      hospitalDischargeData={response.data}
    />
  )
}

export { HospitalDischargeWidget }
