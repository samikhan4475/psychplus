import { CODESETS } from '@psychplus-v2/constants'
import { GOOGLE_MAPS_API_KEY } from '@psychplus-v2/env'
import { getCodesets, getIsFeatureFlagEnabled, getProfile } from '@/api'
import { FeatureFlags } from '@/constants'
import { ProfileStoreProvider } from '@/features/account/profile/store'
import ScheduleVisitView from '@/features/appointments/search/ui/schedule-visit/schedule-visit-view'
import { CodesetStoreProvider, GooglePlacesContextProvider } from '@/providers'

const ScheduleVisitPage = async () => {
  const [codesets, profileResponse, featureFlagResponse] = await Promise.all([
    getCodesets([CODESETS.UsStates]),
    getProfile(),
    getIsFeatureFlagEnabled(FeatureFlags.ehr14892SchedulingOptimization),
  ])

  if (profileResponse.state === 'error') {
    throw new Error(profileResponse.error)
  }

  const isSchedulingOptimizationEnabled =
    featureFlagResponse?.state === 'success' ? featureFlagResponse.data : false
  return (
    <ProfileStoreProvider profile={profileResponse.data}>
      <CodesetStoreProvider codesets={codesets}>
        <GooglePlacesContextProvider apiKey={GOOGLE_MAPS_API_KEY}>
          <ScheduleVisitView googleAPIkey={GOOGLE_MAPS_API_KEY} isSchedulingOptimizationEnabled={isSchedulingOptimizationEnabled}/>
        </GooglePlacesContextProvider>
      </CodesetStoreProvider>
    </ProfileStoreProvider>
  )
}

export default ScheduleVisitPage
