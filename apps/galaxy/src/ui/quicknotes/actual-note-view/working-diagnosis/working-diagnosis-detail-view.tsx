import { Text } from '@radix-ui/themes'
import { getQuicknoteSections } from '@/api'
import { getIcd10DiagnosisAPI } from '@/ui/diagnosis/api'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type WorkingDiagnosisDetailProps = {
  patientId: string
}

const WorkingDiagnosisDetailView = async ({
  patientId,
}: WorkingDiagnosisDetailProps) => {
  const quickNotesResponse = await getQuicknoteSections({
    patientId: Number(patientId),
    sectionName: [QuickNoteSectionName.QuickNoteSectionDiagnosis],
  })

  if (quickNotesResponse.state === 'error') {
    return <Text>{quickNotesResponse.error}</Text>
  }
  const { sectionItemValue } = quickNotesResponse.data?.[0] || {}
  let DiagnosisCodes = sectionItemValue?.split(',') || []
  if (sectionItemValue === 'empty' || DiagnosisCodes?.length === 0) {
    DiagnosisCodes = []
  }
  const Icd10DiagnosisResponse = await getIcd10DiagnosisAPI({
    DiagnosisCodes,
  })

  const codesData =
    Icd10DiagnosisResponse.state === 'success'
      ? Icd10DiagnosisResponse.data
      : []

  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuickNoteSectionDiagnosis}
    >
      <Details data={codesData} />
    </ActualNoteDetailsWrapper>
  )
}

export { WorkingDiagnosisDetailView }
