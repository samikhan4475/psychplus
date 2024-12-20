import { Box } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { Appointment } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { transformIn } from './data'
import { MseWidget } from './mse-widget'

interface HpiWidgetLoaderProps {
  patientId: string
  appointment?: Appointment
  isMseTab?: boolean
}

const MseWidgetLoader = async ({
  patientId,
  appointment,
  isMseTab = false,
}: HpiWidgetLoaderProps) => {
  const response = await getQuickNoteDetailAction(patientId, [
    QuickNoteSectionName.QuicknoteSectionMse,
  ])

  if (response.state === 'error') {
    return <Box>fail</Box>
  }

  const initialValue = transformIn(response.data)

  return (
    <MseWidget
      patientId={patientId}
      initialValue={initialValue}
      isMseTab={isMseTab}
      appointment={appointment}
    />
  )
}

export { MseWidgetLoader }
