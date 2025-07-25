import { unstable_noStore as noStore } from 'next/cache'

import { PersonalDetailsClient } from './personal-details.client'
import { GOOGLE_MAPS_API_KEY,PATIENT_APP_URL } from '@psychplus-v2/env'


const PersonalDetailsServer = async () => {
  noStore()

  return <PersonalDetailsClient mapKey={GOOGLE_MAPS_API_KEY} patientAppUrl={PATIENT_APP_URL}  />
}

export { PersonalDetailsServer }
