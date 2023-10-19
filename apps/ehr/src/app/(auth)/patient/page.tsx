import { getAuthToken } from '@psychplus/auth'
import { PatientWidgetPortal } from '@psychplus/widgets/client'

const PatientPage = () => (
  <div className="h-[400px]">
    <PatientWidgetPortal token={getAuthToken()} patientId="10560" />
  </div>
)

export default PatientPage
