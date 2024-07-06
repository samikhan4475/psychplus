import { CODESETS } from '@psychplus-v2/constants'
import { GOOGLE_MAPS_API_KEY } from '@psychplus-v2/env'
import { getCodesets, getConsents } from '@/api'
import { SearchAppointmentsView } from '@/features/appointments/search'
import { getCareTeam } from '@/features/care-team/api'
import { CodesetStoreProvider } from '@/providers'

const SearchAppointmentsPage = async () => {
  const [codesets, userConsentsResponse, careTeamResposne] = await Promise.all([
    getCodesets([CODESETS.Language]),
    getConsents(),
    getCareTeam(),
  ])

  if (careTeamResposne.state === 'error') {
    throw new Error(careTeamResposne.error)
  }

  if (userConsentsResponse.state === 'error') {
    throw new Error(userConsentsResponse.error)
  }

  return (
    <CodesetStoreProvider codesets={codesets}>
      <SearchAppointmentsView
        userConsents={userConsentsResponse.data}
        careTeam={careTeamResposne.data.careTeam}
        mapKey={GOOGLE_MAPS_API_KEY}
      />
    </CodesetStoreProvider>
  )
}

export default SearchAppointmentsPage
