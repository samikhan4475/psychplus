import { type PatientParams } from '@psychplus/patient'
import { CLINICAL_URL } from '@psychplus/utils/constants'
import { getAuthToken } from '@psychplus/utils/cookies'
import { createSearchParams } from '@psychplus/utils/url'
import { PATIENT_REFERRALS_LIST_WIDGET } from '..'
import { WidgetPortal } from '../components'

interface Props extends PatientParams {
  hideFilters?: boolean
  includeInactive?: boolean
  title?: string
}

const PatientReferralsListWidget = (props: Props) => {
  const searchParams = createSearchParams({
    token: getAuthToken(),
    patientId: `${props.patientId}`,
    hideFilters: `${props.hideFilters}`,
    includeInactive: `${props.includeInactive}`,
    title: props.title,
  })

  return (
    <WidgetPortal
      src={`${CLINICAL_URL}/galaxy/widgets/patient-referrals-list?${searchParams.toString()}`}
      name={PATIENT_REFERRALS_LIST_WIDGET}
    />
  )
}

export { PatientReferralsListWidget }
