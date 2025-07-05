import { getProfile } from '@/api'
import { ProfileStoreProvider } from '@/features/account/profile/store'
import JournalView from '@/features/journal/ui/journal-view'
import { Text } from '@radix-ui/themes'

const JournalPage = async () => {
  const [
    profileResponse,
  ] = await Promise.all([
    getProfile(),
  ])

  if (profileResponse.state === 'error') {
    return <Text>{profileResponse.error}</Text>
  }

  return <ProfileStoreProvider profile={profileResponse.data}>
    <JournalView />
  </ProfileStoreProvider>
}

export default JournalPage
