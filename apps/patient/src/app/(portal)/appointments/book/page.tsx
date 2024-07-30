import { redirect } from 'next/navigation'
import { CODESETS } from '@psychplus-v2/constants'
import { GOOGLE_MAPS_API_KEY, STRIPE_PUBLISHABLE_KEY } from '@psychplus-v2/env'
import { SearchParams } from '@psychplus/utils/url'
import { getCodesets, getConsents } from '@/api'
import { BookAppointmentView } from '@/features/appointments/book/ui/book-appointment-view'
import { getCreditCards } from '@/features/billing/credit-debit-cards/api'
import { sortCreditCardsByPrimary } from '@/features/billing/credit-debit-cards/utils'
import {
  getInsurancePayers,
  getPatientInsurances,
} from '@/features/billing/payments/api'
import { getCareTeam } from '@/features/care-team/api'
import { CodesetStoreProvider, GooglePlacesContextProvider } from '@/providers'

const SearchAppointmentsPage = async ({
  searchParams,
}: {
  searchParams: SearchParams
}) => {
  if (
    !searchParams.appointmentType ||
    !searchParams.providerType ||
    !searchParams.slot ||
    !searchParams.clinic ||
    !searchParams.specialist
  ) {
    redirect('/')
  }

  const { appointmentType, providerType, slot, clinic, specialist } =
    searchParams

  const [
    creditCardResponse,
    userConsentsResponse,
    careTeamResposne,
    insurancePayerResponse,
    patientInsurancesResponse,
  ] = await Promise.all([
    getCreditCards(),
    getConsents(),
    getCareTeam(),
    getInsurancePayers(),
    getPatientInsurances(),
  ])

  if (creditCardResponse.state === 'error') {
    throw new Error(creditCardResponse.error)
  }

  if (careTeamResposne.state === 'error') {
    throw new Error(careTeamResposne.error)
  }

  if (userConsentsResponse.state === 'error') {
    throw new Error(userConsentsResponse.error)
  }

  if (insurancePayerResponse.state === 'error') {
    throw new Error(insurancePayerResponse.error)
  }

  if (patientInsurancesResponse.state === 'error') {
    throw new Error(patientInsurancesResponse.error)
  }

  const codesets = await getCodesets([
    CODESETS.InsuranceRelationship,
    CODESETS.Gender,
    CODESETS.UsStates,
    CODESETS.InsurancePolicyPriority,
  ])

  return (
    <CodesetStoreProvider codesets={codesets}>
      <GooglePlacesContextProvider apiKey={GOOGLE_MAPS_API_KEY}>
        <BookAppointmentView
          appointmentType={JSON.parse(appointmentType)}
          providerType={JSON.parse(providerType)}
          slot={JSON.parse(slot)}
          clinic={JSON.parse(clinic)}
          specialist={JSON.parse(specialist)}
          mapKey={GOOGLE_MAPS_API_KEY}
          stripeApiKey={STRIPE_PUBLISHABLE_KEY}
          creditCards={sortCreditCardsByPrimary(creditCardResponse.data)}
          userConsents={userConsentsResponse.data}
          careTeam={careTeamResposne.data.careTeam}
          patientInsurances={patientInsurancesResponse.data}
          insurancePayers={insurancePayerResponse.data}
        />
      </GooglePlacesContextProvider>
    </CodesetStoreProvider>
  )
}

export default SearchAppointmentsPage
