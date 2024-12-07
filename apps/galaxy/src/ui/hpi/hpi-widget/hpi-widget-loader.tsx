import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
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

  const initialValue = transformIn(response.data)

  return (
    <HpiWidget
      patientId={patientId}
      initialValue={initialValue}
      isHpiHeader={isHpiHeader}
    />
  )
}

export { HpiWidgetLoader }
