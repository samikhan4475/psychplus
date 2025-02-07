import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { filterAndSort } from '@/utils'
import { transformIn } from './data'
import { HpiWidget } from './hpi-widget'

interface HpiWidgetLoaderProps {
  patientId: string
  isHpiHeader?: boolean
}

const HpiWidgetLoader = async ({
  patientId,
  isHpiHeader,
}: HpiWidgetLoaderProps) => {
  const response = await getQuickNoteDetailAction(patientId, [
    QuickNoteSectionName.QuicknoteSectionHPI,
  ])

  if (response.state === 'error') {
    return <div>fail</div>
  }
  const [data, restData] = filterAndSort(response?.data ?? [], 'hpiOther')
  const initialValue = transformIn(data)

  return (
    <HpiWidget
      patientId={patientId}
      initialValue={initialValue}
      isHpiHeader={isHpiHeader}
      otherData={restData}
    />
  )
}

export { HpiWidgetLoader }
