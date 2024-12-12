import { Text } from '@radix-ui/themes'
import { getPatientReferralsAction } from '@/actions/get-patient-referrals'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'
import { getDefaultPayload } from './utils'

interface ReferralsDetailsViewDetailProps {
  patientId: string
}

const ReferralsDetailsView = async ({
  patientId,
}: ReferralsDetailsViewDetailProps) => {
  const result = await getPatientReferralsAction({
    patientIds: [patientId],
    tags: [QuickNoteSectionName.QuicknoteSectionReferrals],
    payload: getDefaultPayload(),
  })
  if (result.state === 'error') {
    return <Text>{result.error}</Text>
  }
  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuicknoteSectionReferrals}
    >
      <Details data={result?.data?.referrals} />
    </ActualNoteDetailsWrapper>
  )
}

export { ReferralsDetailsView }
