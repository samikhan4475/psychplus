import { Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { getPatientProfile } from '@/api'
import { transformIn } from '@/ui/hpi/hpi-widget/data'
import { getPatientAge, getPatientFullName } from '@/utils'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { HpiNarration } from './hpi-narration'
import { getGenderValue } from './utils'

interface HpiProps {
  patientId: string
}

const HpiDetailView = async ({ patientId }: HpiProps) => {
  const [profileResult, hpiResult] = await Promise.all([
    getPatientProfile(patientId),
    getQuickNoteDetailAction(
      patientId,
      [QuickNoteSectionName.QuicknoteSectionHPI],
      true,
    ),
  ])

  if (profileResult.state === 'error') {
    return <div>{profileResult.error}</div>
  }

  if (hpiResult.state === 'error') {
    return <Text>{hpiResult.error}</Text>
  }
  const { legalName, birthdate, gender } = profileResult.data

  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuicknoteSectionHPI}
    >
      <HpiNarration
        patient={{
          name: getPatientFullName(legalName),
          age: getPatientAge(birthdate),
          gender: getGenderValue(gender),
        }}
        symptoms={transformIn(hpiResult.data, true)}
      />
    </ActualNoteDetailsWrapper>
  )
}

export { HpiDetailView }
