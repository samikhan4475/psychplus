import { CODESETS } from '@psychplus-v2/constants'
import { getCodesets, getConsents } from '@/api'
import { SearchAppointmentsView } from '@/features/appointments/search'
import { CodesetStoreProvider } from '@/providers'

const SearchAppointmentsPage = async () => {
  const [codesets, userConsentsResponse] = await Promise.all([
    getCodesets([CODESETS.Language]),
    getConsents(),
  ])

  if (userConsentsResponse.state === 'error') {
    throw new Error(userConsentsResponse.error)
  }

  return (
    <CodesetStoreProvider codesets={codesets}>
      <SearchAppointmentsView userConsents={userConsentsResponse.data} />
    </CodesetStoreProvider>
  )
}

export default SearchAppointmentsPage
