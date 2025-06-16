import { unstable_noStore as noStore } from 'next/cache'
import { CODESETS } from '@psychplus-v2/constants'
import { GOOGLE_MAPS_API_KEY } from '@psychplus-v2/env'
import { getCodesets } from '@/api'
import { CodesetStoreProvider, ToastProvider } from '@/providers'
import { ScheduleAppointmentListClient } from './schedule-appointment-list.client'

const ScheduleAppointmentListServer = async () => {
  noStore()

  const [codesets] = await Promise.all([
    getCodesets([
      CODESETS.Language,
      CODESETS.UsStates,
      CODESETS.SpecialistType,
    ]),
  ])

  return (
    <ToastProvider>
      <CodesetStoreProvider codesets={codesets}>
        <ScheduleAppointmentListClient mapKey={GOOGLE_MAPS_API_KEY} />
      </CodesetStoreProvider>
    </ToastProvider>
  )
}

export { ScheduleAppointmentListServer }
