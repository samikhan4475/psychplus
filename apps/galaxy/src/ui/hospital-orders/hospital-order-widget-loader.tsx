import { Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { HospitalOrdersView } from './hospital-orders-view'

interface HospitalOrderWidgetLoaderProps {
  patientId: string
}

const HospitalOrderWidgetLoader = async ({
  patientId,
}: HospitalOrderWidgetLoaderProps) => {
  const response = await getQuickNoteDetailAction(patientId, [
    QuickNoteSectionName.QuickNoteSectionHospitalOrders,
  ])

  if (response.state === 'error') return <Text>{response.error}</Text>

  return <HospitalOrdersView patientId={patientId} data={response.data} />
}

export { HospitalOrderWidgetLoader }
