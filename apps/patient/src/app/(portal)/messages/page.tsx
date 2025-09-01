import { Text } from '@radix-ui/themes'
import { getProfile } from '@/api'
import { ProfileStoreProvider } from '@/features/account/profile/store'
import { getCareTeam } from '@/features/care-team/api'
import { getUserGroups } from '@/features/messages/actions'
import MessagesView from '@/features/messages/ui/messages-view'

const MessagesPage = async () => {
  const [careTeamResponse, profileResponse, userGroupResponse] =
    await Promise.all([getCareTeam(), getProfile(), getUserGroups()])

  if (careTeamResponse.state === 'error') {
    return <Text>{careTeamResponse.error}</Text>
  }

  if (profileResponse.state === 'error') {
    return <Text>{profileResponse.error}</Text>
  }

  if (userGroupResponse.state === 'error') {
    return <Text>{userGroupResponse.error}</Text>
  }

  return (
    <ProfileStoreProvider profile={profileResponse.data}>
      <MessagesView
        careTeam={careTeamResponse.data.careTeam}
        userGroups={userGroupResponse.data}
      />
    </ProfileStoreProvider>
  )
}

export default MessagesPage
