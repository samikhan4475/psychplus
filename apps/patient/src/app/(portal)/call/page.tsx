import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { User } from '@psychplus-v2/auth'
import { CODESETS } from '@psychplus-v2/constants'
import { GOOGLE_MAPS_API_KEY, STRIPE_PUBLISHABLE_KEY } from '@psychplus-v2/env'
import { Text } from '@radix-ui/themes'
import { getCodesets, getProfile } from '@/api'
import { ProfileStoreProvider } from '@/features/account/profile/store'
import { acs_enabled } from '@/features/appointments/upcoming/api/acs-feature'
import { CreditCard } from '@/features/billing/credit-debit-cards/types'
import { sortCreditCardsByPrimary } from '@/features/billing/credit-debit-cards/utils'
import { getInsurancePayers } from '@/features/billing/payments/api'
import { InsurancePolicy } from '@/features/billing/payments/types'
import { getAcsInfo } from '@/features/call/api'
import { UnauthenticatedCallView } from '@/features/call/call-view-unauthenticated'
import { AcsInfo, AcsInfoPayload } from '@/features/call/types'
import { CodesetStoreProvider, GooglePlacesContextProvider } from '@/providers'

const CallView = dynamic(
  () => import('@/features/call/call-view.tsx').then((mod) => mod.CallView),
  { ssr: false },
)

interface Props {
  searchParams: {
    email?: string
    appointmentId?: string
    reference?: string
  }
}

const Call = async ({
  searchParams: { email, appointmentId, reference },
}: Props) => {
  const payload: AcsInfoPayload = {
    isIncludeAppointmentData: true,
  }

  if (email) payload.staffEmail = email
  if (appointmentId) payload.appointmentId = appointmentId
  if (reference) payload.shortUrlReference = reference

  const profileResponse = await getProfile()

  const user: User | undefined =
    profileResponse.state === 'success'
      ? {
          userId: String(profileResponse?.data?.id),
          firstName: profileResponse?.data?.legalName.firstName,
          lastName: profileResponse?.data?.legalName.lastName,
          email: profileResponse?.data?.contactDetails.email,
          birthdate: profileResponse?.data?.birthdate,
        }
      : undefined

  const acsResponse = user?.firstName
    ? await acs_enabled(payload)
    : await getAcsInfo(payload)

  if (acsResponse.state === 'error') {
    return <Text>{acsResponse.error}</Text>
  }

  const codesets = await getCodesets([
    CODESETS.InsuranceRelationship,
    CODESETS.UsStates,
    CODESETS.InsurancePolicyPriority,
    CODESETS.VisitType,
    CODESETS.Gender,
  ])

  const insurancePayerResponse = await getInsurancePayers()
  
  if (insurancePayerResponse.state === 'error') {
    return <Text>{insurancePayerResponse.error}</Text>
  }
  
  if (profileResponse.state === 'error') {
    return (
      <Suspense fallback={<Text>Loading...</Text>}>
        <GooglePlacesContextProvider apiKey={GOOGLE_MAPS_API_KEY}>
          <CodesetStoreProvider codesets={codesets}>
            <UnauthenticatedCallView
              acsInfo={acsResponse.data as AcsInfo}
              stripeApiKey={STRIPE_PUBLISHABLE_KEY}
              insurancePayers={insurancePayerResponse.data}
            />
          </CodesetStoreProvider>
        </GooglePlacesContextProvider>
      </Suspense>
    )
  }

  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <ProfileStoreProvider profile={profileResponse.data}>
        <GooglePlacesContextProvider apiKey={GOOGLE_MAPS_API_KEY}>
          <CodesetStoreProvider codesets={codesets}>
            <CallView
              acsInfo={acsResponse.data as AcsInfo}
              user={user}
              stripeApiKey={STRIPE_PUBLISHABLE_KEY}
              creditCards={sortCreditCardsByPrimary(
                acsResponse.data.paymentData.patientCards as CreditCard[],
              )}
              patientInsurances={
                acsResponse.data.paymentData.patientInsurancePolicies?.filter(
                  (policy) => !policy.isDeleted,
                ) as InsurancePolicy[]
              }
              insurancePayers={insurancePayerResponse.data}
            />
          </CodesetStoreProvider>
        </GooglePlacesContextProvider>
      </ProfileStoreProvider>
    </Suspense>
  )
}

export default Call
