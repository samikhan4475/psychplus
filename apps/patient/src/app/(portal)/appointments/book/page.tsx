import { CODESETS } from '@psychplus-v2/constants'
import { GOOGLE_MAPS_API_KEY, STRIPE_PUBLISHABLE_KEY } from '@psychplus-v2/env'
import { getCodesets, getProfile } from '@/api'
import { BookAppointmentView } from '@/features/appointments/book/ui/book-appointment-view'
import { getCreditCards } from '@/features/billing/credit-debit-cards/api'
import { sortCreditCardsByPrimary } from '@/features/billing/credit-debit-cards/utils'
import {
  getInsurancePayers,
  getPatientInsurances,
} from '@/features/billing/payments/api'
import { getCareTeam } from '@/features/care-team/api'
import { CodesetStoreProvider, GooglePlacesContextProvider } from '@/providers'
import { ProfileStoreProvider } from '@/features/account/profile/store'

const SearchAppointmentsPage = async () => {

  const [
    creditCardResponse,
    careTeamResposne,
    insurancePayerResponse,
    patientInsurancesResponse,
    profileResponse,
  ] = await Promise.all([
    getCreditCards(),
    getCareTeam(),
    getInsurancePayers(),
    getPatientInsurances(),
    getProfile(),
  ])

  if (creditCardResponse.state === 'error') {
    throw new Error(creditCardResponse.error)
  }

  if (careTeamResposne.state === 'error') {
    throw new Error(careTeamResposne.error)
  }

  if (insurancePayerResponse.state === 'error') {
    throw new Error(insurancePayerResponse.error)
  }

  if (patientInsurancesResponse.state === 'error') {
    throw new Error(patientInsurancesResponse.error)
  }

  if (profileResponse.state === 'error') {
    throw new Error(profileResponse.error)
  }

  const codesets = await getCodesets([
    CODESETS.InsuranceRelationship,
    CODESETS.Gender,
    CODESETS.UsStates,
    CODESETS.InsurancePolicyPriority,
  ])

  return (
    <ProfileStoreProvider profile={profileResponse.data}>
      <CodesetStoreProvider codesets={codesets}>
        <GooglePlacesContextProvider apiKey={GOOGLE_MAPS_API_KEY}>
          <BookAppointmentView
            mapKey={GOOGLE_MAPS_API_KEY}
            stripeApiKey={STRIPE_PUBLISHABLE_KEY}
            creditCards={sortCreditCardsByPrimary(creditCardResponse.data)}
            careTeam={careTeamResposne.data.careTeam}
            patientInsurances={patientInsurancesResponse.data}
            insurancePayers={insurancePayerResponse.data}
          />
        </GooglePlacesContextProvider>
      </CodesetStoreProvider>
    </ProfileStoreProvider>
  )
}

export default SearchAppointmentsPage
