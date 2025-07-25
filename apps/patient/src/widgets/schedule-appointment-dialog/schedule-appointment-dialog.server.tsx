import { unstable_noStore as noStore } from 'next/cache'
import { GOOGLE_MAPS_API_KEY,PATIENT_APP_URL } from '@psychplus-v2/env'
import { GooglePlacesContextProvider } from '@/providers'
import { ScheduleAppointmentDialogClient } from './schedule-appointment-dialog.client'

const ScheduleAppointmentDialogServer = async () => {
  noStore()

  return (
    <GooglePlacesContextProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <ScheduleAppointmentDialogClient mapKey={GOOGLE_MAPS_API_KEY} patientAppUrl={PATIENT_APP_URL} />
    </GooglePlacesContextProvider>
  )
}

export { ScheduleAppointmentDialogServer }
