import { redirect } from 'next/navigation'
import { CODESETS } from '@psychplus-v2/constants'
import { GOOGLE_MAPS_API_KEY, STRIPE_PUBLISHABLE_KEY } from '@psychplus-v2/env'
import { SearchParams } from '@psychplus/utils/url'
import { getCodesets, getConsents, getProfile } from '@/api'
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

  const {
    appointmentType,
    providerType,
    slot,
    clinic,
    specialist,
    appointmentId,
    specialistId,
  } = searchParams

  const [
    creditCardResponse,
    userConsentsResponse,
    careTeamResposne,
    insurancePayerResponse,
    patientInsurancesResponse,
    profileResponse,
  ] = await Promise.all([
    getCreditCards(),
    getConsents(),
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

  if (userConsentsResponse.state === 'error') {
    throw new Error(userConsentsResponse.error)
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
            appointmentId={appointmentId}
            specialistId={specialistId}
          />
        </GooglePlacesContextProvider>
      </CodesetStoreProvider>
    </ProfileStoreProvider>
  )
}

export default SearchAppointmentsPage
