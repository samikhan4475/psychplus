import { CLINICAL_URL } from '@psychplus/utils/constants'
import { getAuthToken } from '@psychplus/utils/cookies'
import { createSearchParams } from '@psychplus/utils/url'
import { CLINIC_WIDGET } from '..'
import { WidgetPortal } from '../components'

const ClinicWidget = () => {
  const searchParams = createSearchParams({
    token: getAuthToken(),
  })

  return (
    <WidgetPortal
      src={`${CLINICAL_URL}/widgets/clinic?${searchParams.toString()}`}
      name={CLINIC_WIDGET}
    />
  )
}

export { ClinicWidget }
