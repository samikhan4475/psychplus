import { Flex } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { transformIn } from './data'
import { TherapyWidget } from './therapy-widget'

interface TherapyWidgetLoaderProps {
  patientId: string
}

const TherapyLoader = async ({ patientId }: TherapyWidgetLoaderProps) => {
  const response = await getQuickNoteDetailAction(patientId, [
    QuickNoteSectionName.QuickNoteSectionTherapy,
  ])

  if (response.state === 'error') {
    return <div>fail</div>
  }

  const initialValue = transformIn(response.data)

  return (
    <Flex direction="column" width="100%">
      <TherapyWidget patientId={patientId} initialValue={initialValue} />
    </Flex>
  )
}

export { TherapyLoader }
