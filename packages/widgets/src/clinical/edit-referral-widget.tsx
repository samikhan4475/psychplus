import { CLINICAL_URL } from '@psychplus/utils/constants'
import { getAuthToken } from '@psychplus/utils/cookies'
import { createSearchParams } from '@psychplus/utils/url'
import { EDIT_REFERRAL_WIDGET } from '..'
import { DialogPortal } from '../components'

const EditReferralWidget = () => {
  const searchParams = createSearchParams({
    token: getAuthToken(),
  })

  return (
    <DialogPortal
      src={`${CLINICAL_URL}/galaxy/widgets/edit-referral?${searchParams.toString()}`}
      name={EDIT_REFERRAL_WIDGET}
    />
  )
}

export { EditReferralWidget }
