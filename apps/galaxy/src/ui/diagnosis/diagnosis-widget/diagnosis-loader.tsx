import { Text } from '@radix-ui/themes'
import * as api from '@/api'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { getFavouriteDiagnosisAPI, getIcd10DiagnosisAPI } from '../api'
import { DiagnosisWidget } from './diagnosis-widget'

interface DiagnosisWidgetLoaderProps {
  patientId: string
}

const DiagnosisWidgetLoader = async ({
  patientId,
}: DiagnosisWidgetLoaderProps) => {
  const quickNotesResponse = await api.getQuicknoteSections({
    patientId: Number(patientId),
    sectionName: [QuickNoteSectionName.QuickNoteSectionDiagnosis],
  })
  if (quickNotesResponse.state === 'error') {
    return <Text>{quickNotesResponse.error}</Text>
  }

  const { sectionItemValue } = quickNotesResponse.data?.[0] || {}
  const DiagnosisCodes = sectionItemValue?.split(',') || []
  if (sectionItemValue === 'empty' || DiagnosisCodes?.length === 0) {
    return
  }
  const [workingResponse, favouritesResponse] = await Promise.all([
    getIcd10DiagnosisAPI({
      DiagnosisCodes,
    }),
    getFavouriteDiagnosisAPI(),
  ])

  const workingDiagnosisData =
    workingResponse.state === 'success' ? workingResponse.data : []
  const favouritesDiagnosisData =
    favouritesResponse.state === 'success' ? favouritesResponse.data : []
  return (
    <DiagnosisWidget
      workingDiagnosis={workingDiagnosisData}
      favouriteDiagnosis={favouritesDiagnosisData}
    />
  )
}

export { DiagnosisWidgetLoader }
