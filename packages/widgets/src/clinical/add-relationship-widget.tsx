import { type PatientParams } from '@psychplus/patient'
import { CLINICAL_URL } from '@psychplus/utils/constants'
import { getAuthToken } from '@psychplus/utils/cookies'
import { createSearchParams } from '@psychplus/utils/url'
import { ADD_RELATIONSHIP_WIDGET } from '..'
import { DialogPortal } from '../components'

type Props = PatientParams

const AddRelationshipWidget = (props: Props) => {
  const searchParams = createSearchParams({
    token: getAuthToken(),
    patientId: `${props.patientId}`,
  })

  return (
    <DialogPortal
      src={`${CLINICAL_URL}/widgets/add-relationship?${searchParams.toString()}`}
      name={ADD_RELATIONSHIP_WIDGET}
    />
  )
}

export { AddRelationshipWidget }
