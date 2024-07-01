import { type PatientParams } from '@psychplus/patient'
import { CLINICAL_URL } from '@psychplus/utils/constants'
import { getAuthToken } from '@psychplus/utils/cookies'
import { createSearchParams } from '@psychplus/utils/url'
import { WidgetPortal } from '../components'
import { LINK_ACCOUNT_WIDGET } from '..'

type Props = PatientParams

const LinkAccountWidget = (props: Props) => {
  const searchParams = createSearchParams({
    token: getAuthToken(),
    patientId: `${props.patientId}`,
  })

  return (
    <WidgetPortal
      src={`${CLINICAL_URL}/widgets/link-account?${searchParams.toString()}`}
      name={LINK_ACCOUNT_WIDGET}
      isShadowLess
    />
  )
}

export { LinkAccountWidget }
