import { Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { SpravatoWidget } from './spravato-widget'

interface SpravatoWidgetLoaderProps {
  patientId: string
}

const SpravatoWidgetLoader = async ({
  patientId,
}: SpravatoWidgetLoaderProps) => {
  const response = await getQuickNoteDetailAction(patientId, [
    QuickNoteSectionName.QuicknoteSectionProcedureSpravato,
  ])

  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }

  return <SpravatoWidget procedureSpravatoData={response.data} />
}

export { SpravatoWidgetLoader }
