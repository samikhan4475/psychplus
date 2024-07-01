import { type PatientParams } from '@psychplus/patient'
import { CLINICAL_URL } from '@psychplus/utils/constants'
import { getAuthToken } from '@psychplus/utils/cookies'
import { createSearchParams } from '@psychplus/utils/url'
import { WidgetPortal } from '../components'
import { PATIENT_RELATIONSHIPS_WIDGET } from '..'

type Props = PatientParams

const PatientRelationshipWidget = (props: Props) => {
  const searchParams = createSearchParams({
    token: getAuthToken(),
    patientId: `${props.patientId}`,
  })

  return (
    <WidgetPortal
      src={`${CLINICAL_URL}/widgets/patient-relationship?${searchParams.toString()}`}
      name={PATIENT_RELATIONSHIPS_WIDGET}
      isShadowLess
    />
  )
}

export { PatientRelationshipWidget }
