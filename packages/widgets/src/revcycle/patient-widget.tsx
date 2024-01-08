import { type PatientParams } from '@psychplus/patient'
import { REVCYCLE_URL } from '@psychplus/utils/constants'
import { getAuthToken } from '@psychplus/utils/cookies'
import { createSearchParams } from '@psychplus/utils/url'
import { PATIENT_WIDGET } from '..'
import { WidgetPortal } from '../components'

type Props = PatientParams

const PatientWidget = (props: Props) => {
  const searchParams = createSearchParams({
    token: getAuthToken(),
    patientId: `${props.patientId}`,
  })

  return (
    <WidgetPortal
      src={`${REVCYCLE_URL}/widgets/patient?${searchParams.toString()}`}
      name={PATIENT_WIDGET}
    />
  )
}

export { PatientWidget }
