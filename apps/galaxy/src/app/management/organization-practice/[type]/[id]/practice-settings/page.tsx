import { GOOGLE_MAPS_API_KEY } from '@/constants'
import { PracticeSettingsView } from '@/ui/practice-settings'

const PracticeSettingsPage = () => {
  return <PracticeSettingsView googleApiKey={GOOGLE_MAPS_API_KEY}/>
}

export default PracticeSettingsPage
