import { GOOGLE_MAPS_API_KEY } from '@/constants'
import { PatientLookupView } from '@/ui/patient-lookup'

const PatientLookupPage = () => (
  <PatientLookupView googleApiKey={GOOGLE_MAPS_API_KEY} />
)

export default PatientLookupPage
