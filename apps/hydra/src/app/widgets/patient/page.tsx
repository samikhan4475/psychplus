import type { SearchParams } from '@psychplus/types'
import { PatientWidgetServer } from '@psychplus/widgets/server'

const PatientWidgetPage = ({
  searchParams,
}: {
  searchParams: SearchParams
}) => (
  <PatientWidgetServer
    token={searchParams.token}
    patientId={searchParams.patientId}
  />
)

export default PatientWidgetPage
