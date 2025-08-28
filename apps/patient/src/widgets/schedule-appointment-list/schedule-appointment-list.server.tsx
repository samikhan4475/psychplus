import { unstable_noStore as noStore } from 'next/cache'
import { CODESETS } from '@psychplus-v2/constants'
import { GOOGLE_MAPS_API_KEY, STRIPE_PUBLISHABLE_KEY } from '@psychplus-v2/env'
import { getCodesets, getIsFeatureFlagEnabled } from '@/api'
import { FeatureFlags } from '@/constants'
import { CodesetStoreProvider, ToastProvider } from '@/providers'
import { LegacyScheduleAppointmentListClient } from './schedule-appointment-list-legacy.client '
import { ScheduleAppointmentListClient } from './schedule-appointment-list.client'

const ScheduleAppointmentListServer = async () => {
  noStore()

  const [codesets, featureFlagResponse] = await Promise.all([
    getCodesets([
      CODESETS.Language,
      CODESETS.UsStates,
      CODESETS.SpecialistType,
    ]),
    getIsFeatureFlagEnabled(FeatureFlags.ehr14892SchedulingOptimization, true),
  ])
  const isSchedulingOptimizationEnabled =
    featureFlagResponse?.state === 'success' ? featureFlagResponse.data : false
  return (
    <ToastProvider>
      <CodesetStoreProvider codesets={codesets}>
        {isSchedulingOptimizationEnabled ? (
          <ScheduleAppointmentListClient
            mapKey={GOOGLE_MAPS_API_KEY}
            stripeKey={STRIPE_PUBLISHABLE_KEY}
            isSchedulingOptimizationEnabled={isSchedulingOptimizationEnabled}
          />
        ) : (
          <LegacyScheduleAppointmentListClient
            stripeKey={STRIPE_PUBLISHABLE_KEY}
            mapKey={GOOGLE_MAPS_API_KEY}
          />
        )}
      </CodesetStoreProvider>
    </ToastProvider>
  )
}

export { ScheduleAppointmentListServer }
