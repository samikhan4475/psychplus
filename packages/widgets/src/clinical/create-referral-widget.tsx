import { type PatientParams } from '@psychplus/patient'
import { CLINICAL_URL } from '@psychplus/utils/constants'
import { getAuthToken } from '@psychplus/utils/cookies'
import { createSearchParams } from '@psychplus/utils/url'
import { CREATE_REFERRAL_WIDGET } from '..'
import { DialogPortal } from '../components'

type Props = PatientParams

const CreateReferralWidget = (props: Props) => {
  const searchParams = createSearchParams({
    token: getAuthToken(),
    patientId: `${props.patientId}`,
  })

  return (
    <DialogPortal
      src={`${CLINICAL_URL}/widgets/create-referral?${searchParams.toString()}`}
      name={CREATE_REFERRAL_WIDGET}
    />
  )
}

export { CreateReferralWidget }
