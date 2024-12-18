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
  const { sectionItemValue } =
    quickNotesResponse.data?.find((item) => item.sectionItem === 'diagnosis') ||
    {}
  const DiagnosisCodes = sectionItemValue?.split(',') || []
  if (sectionItemValue === 'empty' || DiagnosisCodes?.length === 0) {
    return
  }
  const Icd10DiagnosisResponse = await getIcd10DiagnosisAPI({
    DiagnosisCodes,
  })

  if (Icd10DiagnosisResponse.state === 'error') {
    return <Text>{Icd10DiagnosisResponse.error}</Text>
  }

  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuickNoteSectionDiagnosis}
    >
      <Details data={Icd10DiagnosisResponse.data} />
    </ActualNoteDetailsWrapper>
  )
}

export { WorkingDiagnosisDetailView }
