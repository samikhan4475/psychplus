import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { transformIn } from './data'
import { SocialHxWidget } from './social-hx-widget'

interface SocialHxWidgetLoaderProps {
  patientId: string
}

const SocialHxLoader = async ({ patientId }: SocialHxWidgetLoaderProps) => {
  const response = await getQuickNoteDetailAction(patientId, [
    QuickNoteSectionName.QuickNoteSectionSocialHx,
  ])

  if (response.state === 'error') {
    return <div>fail</div>
  }

  const initialValue = transformIn(response.data)

  return <SocialHxWidget patientId={patientId} initialValue={initialValue} />
}

export { SocialHxLoader }
