import { Text } from '@radix-ui/themes'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { getUrineDrugScreenAction } from './actions'
import { ScreeningView } from './screening-view'

interface ScreeningLoaderProps {
  patientId: string
}

const ScreeningLoader = async ({ patientId }: ScreeningLoaderProps) => {
  const urineDrugScreenResponse = await getUrineDrugScreenAction({
    patientId,
    sectionName: QuickNoteSectionName.QuicknoteSectionUds,
  })

  if (urineDrugScreenResponse.state === 'error') {
    return <Text>{urineDrugScreenResponse.error}</Text>
  }

  return (
    <ScreeningView
      patientId={patientId}
      urineDrugScreenData={urineDrugScreenResponse.data}
    />
  )
}

export { ScreeningLoader }
