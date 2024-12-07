import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { EctWidget } from './ect-widget'

interface EctWidgetLoaderProps {
  patientId: string
}

const EctWidgetLoader = async ({ patientId }: EctWidgetLoaderProps) => {
  const response = await getQuickNoteDetailAction(patientId, [
    QuickNoteSectionName.QuicknoteSectionProcedureEtcTab,
  ])

  if (response.state === 'error') {
    return <div>fail</div>
  }

  return <EctWidget patientId={patientId} procedureEctData={response.data} />
}

export { EctWidgetLoader }
