import { getPatientCreditCards } from '@/actions'
import { GOOGLE_MAPS_API_KEY, STRIPE_PUBLISHABLE_KEY } from '@/constants'
import { PatientInfoView } from '@/ui/patient-info'
import {
  getInsurancePayersAction,
  getPatientConsentsAction,
  getPatientFacesheet,
  getPatientPoliciesAction,
  getPatientPreferredPartnersAction,
  getPatientProfileAction,
  getPatientRelationshipsAction,
  getPatientVisitsAction,
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
    patientFacesheetResult,
    insurancePayersResult,
    patientPoliciesResult,
    patientVisitsResult,
  ] = await Promise.all([
    getPatientProfileAction(params.id),
    getPatientConsentsAction(params.id),
    getPatientRelationshipsAction(params.id),
    getPatientPreferredPartnersAction(params.id),
    getPatientCreditCards(params.id),
    getPatientFacesheet(params.id),
    getInsurancePayersAction(),
    getPatientPoliciesAction(params.id),
    getPatientVisitsAction(params.id),
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

  if (patientPoliciesResult?.state === 'error') {
    return <div>{patientPoliciesResult.error}</div>
  }

  if (insurancePayersResult?.state === 'error') {
    return <div>{insurancePayersResult.error}</div>
  }
  if (patientFacesheetResult?.state === 'error') {
    return <div>{patientFacesheetResult.error}</div>
  }
  if (patientVisitsResult?.state === 'error') {
    return <div>{patientVisitsResult.error}</div>
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
      patientFacesheet={patientFacesheetResult.data}
      patientVisits={patientVisitsResult.data}
      insurancePayers={insurancePayersResult.data}
      patientPolicies={patientPoliciesResult.data}
    />
  )
}

export default PatientInfoPage
