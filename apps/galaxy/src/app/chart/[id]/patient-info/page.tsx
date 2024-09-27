import { getPatientCreditCards } from '@/actions'
import { GOOGLE_MAPS_API_KEY, STRIPE_PUBLISHABLE_KEY } from '@/constants'
import { PatientInfoView } from '@/ui/patient-info'
import {
  getPatientConsentsAction,
  getPatientPreferredPartnersAction,
  getPatientProfileAction,
  getPatientRelationshipsAction,
} from '@/ui/patient-info/patient-info-tab/actions'

interface PatientInfoPageProps {
  params: {
    id: string
  }
}

const PatientInfoPage = async ({ params }: PatientInfoPageProps) => {
  const [
    profileResult,
    consentsResult,
    patientRelationshipsResult,
    preferredPartnerResult,
    patientCardsResult,
  ] = await Promise.all([
    getPatientProfileAction(params.id),
    getPatientConsentsAction(params.id),
    getPatientRelationshipsAction(params.id),
    getPatientPreferredPartnersAction(params.id),
    getPatientCreditCards(params.id),
  ])

  if (profileResult.state === 'error') {
    return <div>{profileResult.error}</div>
  }

  if (consentsResult.state === 'error') {
    return <div>{consentsResult.error}</div>
  }

  if (patientRelationshipsResult.state === 'error') {
    return <div>{patientRelationshipsResult.error}</div>
  }
  if (preferredPartnerResult?.state === 'error') {
    return <div>{preferredPartnerResult.error}</div>
  }

  if (patientCardsResult?.state === 'error') {
    return <div>{patientCardsResult.error}</div>
  }

  return (
    <PatientInfoView
      googleApiKey={GOOGLE_MAPS_API_KEY}
      patientId={params.id}
      stripeApiKey={STRIPE_PUBLISHABLE_KEY}
      patientProfile={profileResult.data}
      patientPreferredPartners={preferredPartnerResult.data}
      patientRelationships={patientRelationshipsResult.data}
      patientConsents={consentsResult.data}
      patientCards={patientCardsResult.data}
    />
  )
}

export default PatientInfoPage
