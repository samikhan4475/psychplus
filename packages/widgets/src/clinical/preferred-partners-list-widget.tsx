import { type PatientParams } from '@psychplus/patient'
import { CLINICAL_URL } from '@psychplus/utils/constants'
import { getAuthToken } from '@psychplus/utils/cookies'
import { createSearchParams } from '@psychplus/utils/url'
import {  PREFERRED_PARTNERS_LIST_WIDGET } from '..'
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
      src={`${CLINICAL_URL}/widgets/preferred-partners-list?${searchParams.toString()}`}
      name={PREFERRED_PARTNERS_LIST_WIDGET}
    />
  )
}

export { PatientReferralsListWidget }
