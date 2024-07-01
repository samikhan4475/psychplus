import { type PatientParams } from '@psychplus/patient'
import { CLINICAL_URL } from '@psychplus/utils/constants'
import { getAuthToken } from '@psychplus/utils/cookies'
import { createSearchParams } from '@psychplus/utils/url'
import { WidgetPortal } from '../components'
import { PATIENT_INFORMATION_WIDGET } from '..'

type Props = PatientParams

const PatientInformationWidget = (props: Props) => {
  const searchParams = createSearchParams({
    token: getAuthToken(),
    patientId: `${props.patientId}`,
  })

  return (
    <WidgetPortal
      src={`${CLINICAL_URL}/widgets/patient-information?${searchParams.toString()}`}
      name={PATIENT_INFORMATION_WIDGET}
    />
  )
}

export { PatientInformationWidget }
