import { CODESETS } from '@psychplus-v2/constants'
import { GOOGLE_MAPS_API_KEY } from '@psychplus-v2/env'
import { getCodesets, getConsents, getProfile } from '@/api'
import { ProfileStoreProvider } from '@/features/account/profile/store'
import { SearchAppointmentsView } from '@/features/appointments/search'
import { getCareTeam } from '@/features/care-team/api'
import { CodesetStoreProvider } from '@/providers'

const SearchAppointmentsPage = async () => {
  const [codesets, userConsentsResponse, careTeamResposne, profileResponse] =
    await Promise.all([
      getCodesets([CODESETS.Language,
        CODESETS.UsStates
      ]),
      getConsents(),
      getCareTeam(),
      getProfile(),
    ])

  if (careTeamResposne.state === 'error') {
    throw new Error(careTeamResposne.error)
  }

  if (userConsentsResponse.state === 'error') {
    throw new Error(userConsentsResponse.error)
  }

  if (profileResponse.state === 'error') {
    throw new Error(profileResponse.error)
  }

  return (
    <ProfileStoreProvider profile={profileResponse.data}>
      <CodesetStoreProvider codesets={codesets}>
        <SearchAppointmentsView
          userConsents={userConsentsResponse.data}
          careTeam={careTeamResposne.data.careTeam}
          mapKey={GOOGLE_MAPS_API_KEY}
        />
      </CodesetStoreProvider>
    </ProfileStoreProvider>
  )
}

export default SearchAppointmentsPage
