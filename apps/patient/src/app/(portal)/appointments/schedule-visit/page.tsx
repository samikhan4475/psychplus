import { CODESETS } from '@psychplus-v2/constants'
import { GOOGLE_MAPS_API_KEY } from '@psychplus-v2/env'
import { getCodesets, getProfile } from '@/api'
import { ProfileStoreProvider } from '@/features/account/profile/store'
import ScheduleVisitView from '@/features/appointments/search/ui/schedule-visit/schedule-visit-view'
import { CodesetStoreProvider, GooglePlacesContextProvider } from '@/providers'

const ScheduleVisitPage = async () => {
  const [codesets, profileResponse] = await Promise.all([
    getCodesets([CODESETS.UsStates]),
    getProfile(),
  ])

  if (profileResponse.state === 'error') {
    throw new Error(profileResponse.error)
  }

  return (
    <ProfileStoreProvider profile={profileResponse.data}>
      <CodesetStoreProvider codesets={codesets}>
        <GooglePlacesContextProvider apiKey={GOOGLE_MAPS_API_KEY}>
          <ScheduleVisitView />
        </GooglePlacesContextProvider>
      </CodesetStoreProvider>
    </ProfileStoreProvider>
  )
}

export default ScheduleVisitPage
