import { type PatientParams } from '@psychplus/patient'
import { CLINICAL_URL } from '@psychplus/utils/constants'
import { getAuthToken } from '@psychplus/utils/cookies'
import { createSearchParams } from '@psychplus/utils/url'
import { DialogPortal } from '../components'
import { PATIENT_HISTORY_WIDGET } from '..'

type Props = PatientParams

const PatientHistoryWidget = (props: Props) => {
  const searchParams = createSearchParams({
    token: getAuthToken(),
    patientId: `${props.patientId}`,
  })

  return (
    <DialogPortal
      src={`${CLINICAL_URL}/widgets/patient-history?${searchParams.toString()}`}
      name={PATIENT_HISTORY_WIDGET}
    />
  )
}

export { PatientHistoryWidget }
