import * as api from '@/api'
import { Text } from '@radix-ui/themes'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { AddOnWidget } from './add-on-widget'
import { transformIn } from './data'

interface AddOnLoaderProps {
  patientId: string
}

const AddOnLoader = async ({ patientId }: AddOnLoaderProps) => {
  const response = await api.POST<QuickNoteSectionItem[]>(
    api.NOTE_DETAILS_SEARCH_ENDPOINT,
    {
      patientId: Number(patientId),
      sectionName: [QuickNoteSectionName.Addon],
      isLatest: true,
    },
  )

  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }

  const initialValue = transformIn(
    response.state === 'success' ? response.data : [],
  )

  return <AddOnWidget patientId={patientId} initialValue={initialValue} />
}

export { AddOnLoader }
