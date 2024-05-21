import { CLINICAL_URL } from '@psychplus/utils/constants'
import { getAuthToken } from '@psychplus/utils/cookies'
import { createSearchParams } from '@psychplus/utils/url'
import { REFERRAL_DETAILS_WIDGET } from '..'
import { DialogPortal } from '../components'

const ReferralDetailsWidget = () => {
  const searchParams = createSearchParams({
    token: getAuthToken(),
  })

  return (
    <DialogPortal
      src={`${CLINICAL_URL}/galaxy/widgets/referral-details?${searchParams.toString()}`}
      name={REFERRAL_DETAILS_WIDGET}
    />
  )
}

export { ReferralDetailsWidget }
