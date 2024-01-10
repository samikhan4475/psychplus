import { CLINICAL_URL } from '@psychplus/utils/constants'
import { getAuthToken } from '@psychplus/utils/cookies'
import { createSearchParams } from '@psychplus/utils/url'
import { ALL_REFERRALS_LIST_WIDGET } from '..'
import { WidgetPortal } from '../components'

interface Props {
  hideFilters?: boolean
  includeInactive?: boolean
}

const AllReferralsListWidget = (props: Props) => {
  const searchParams = createSearchParams({
    token: getAuthToken(),
    hideFilters: `${props.hideFilters}`,
    includeInactive: `${props.includeInactive}`,
  })

  return (
    <WidgetPortal
      src={`${CLINICAL_URL}/widgets/all-referrals-list?${searchParams.toString()}`}
      name={ALL_REFERRALS_LIST_WIDGET}
    />
  )
}

export { AllReferralsListWidget }
