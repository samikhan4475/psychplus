'use client'

import { GooglePlacesContextProvider } from '@/providers/google-places-provider'
import { PracticeSettingsTabs } from './practice-settings-tabs'

interface PracticeSettingsViewProps {
  googleApiKey: string
}

const PracticeSettingsView = ({ googleApiKey }: PracticeSettingsViewProps) => {
  return (
    <GooglePlacesContextProvider apiKey={googleApiKey}>
      <PracticeSettingsTabs />
    </GooglePlacesContextProvider>
  )
}

export { PracticeSettingsView }
