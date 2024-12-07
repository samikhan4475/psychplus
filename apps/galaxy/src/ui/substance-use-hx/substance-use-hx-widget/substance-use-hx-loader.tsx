import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { transformIn } from './data'
import { SubstanceUseHxWidget } from './substance-use-widget'

interface SubstanceUseHxWidgetLoaderProps {
  patientId: string
}

const SubstanceUseHxLoader = async ({
  patientId,
}: SubstanceUseHxWidgetLoaderProps) => {
  const response = await getQuickNoteDetailAction(patientId, [
    QuickNoteSectionName.QuickNoteSectionSubstanceUseHx,
    QuickNoteSectionName.QuickNoteSectionDiagnosis,
  ])

  if (response.state === 'error') {
    return <div>fail</div>
  }

  const initialValue = transformIn(response.data)

  return (
    <SubstanceUseHxWidget
      patientId={patientId}
      initialValue={initialValue}
      responseData={response.data}
    />
  )
}

export { SubstanceUseHxLoader }
