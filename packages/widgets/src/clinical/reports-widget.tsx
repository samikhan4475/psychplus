import { CLINICAL_URL } from '@psychplus/utils/constants'
import { getAuthToken } from '@psychplus/utils/cookies'
import { createSearchParams } from '@psychplus/utils/url'
import { REPORTS_WIDGET } from '..'
import { WidgetPortal } from '../components'

const ReportsWidget = () => {
  const searchParams = createSearchParams({
    token: getAuthToken(),
  })

  return (
    <WidgetPortal
      src={`${CLINICAL_URL}/widgets/reports?${searchParams.toString()}`}
      name={REPORTS_WIDGET}
    />
  )
}

export { ReportsWidget }
