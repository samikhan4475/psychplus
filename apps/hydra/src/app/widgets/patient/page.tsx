import type { SearchParams } from '@psychplus/types'
import { PatientWidgetServer } from '@/widgets/patient'

const PatientWidgetPage = ({
  searchParams,
}: {
  searchParams: SearchParams
}) => {
  if (!searchParams.token) {
    return <div>Token is required</div>
  }

  if (!searchParams.patientId) {
    return <div>Patient ID is required</div>
  }

  return (
    <PatientWidgetServer
      token={searchParams.token}
      patientId={searchParams.patientId}
    />
  )
}

export default PatientWidgetPage
