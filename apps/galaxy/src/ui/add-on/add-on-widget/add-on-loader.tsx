import { Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { AddOnWidget } from './add-on-widget'
import { transformIn } from './data'

interface AddOnLoaderProps {
  patientId: string
}

const AddOnLoader = async ({ patientId }: AddOnLoaderProps) => {
  const response = await getQuickNoteDetailAction(patientId, [
    QuickNoteSectionName.Addon,
  ])

  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }

  const initialValue = transformIn(
    response.state === 'success' ? response.data : [],
  )

  return <AddOnWidget patientId={patientId} initialValue={initialValue} />
}

export { AddOnLoader }
