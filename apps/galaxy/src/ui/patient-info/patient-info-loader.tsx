import { Flex } from '@radix-ui/themes'
import { getPatientCreditCards } from '@/actions'
import {
  getInsurancePayersAction,
  getPatientConsentsAction,
  getPatientFacesheet,
  getPatientPoliciesAction,
  getPatientPreferredPartnersAction,
  getPatientProfileAction,
  getPatientRelationshipsAction,
  getPatientVisitsAction,
} from './patient-info-tab/actions'
import { PatientInfoView } from './patient-info-view'

interface PatientInfoPageProps {
  patientId: string
  stripeApiKey: string
  googleApiKey: string
}

const PatientInfoLoader = async ({
  patientId,
  stripeApiKey,
  googleApiKey,
}: PatientInfoPageProps) => {
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
    getPatientProfileAction(patientId),
    getPatientConsentsAction(patientId),
    getPatientRelationshipsAction(patientId),
    getPatientPreferredPartnersAction(patientId),
    getPatientCreditCards(patientId),
    getPatientFacesheet(patientId),
    getInsurancePayersAction(),
    getPatientPoliciesAction(patientId),
    getPatientVisitsAction(patientId),
  ])

  if (profileResult.state === 'error') {
    return <Flex>{profileResult.error}</Flex>
  }

  if (consentsResult.state === 'error') {
    return <Flex>{consentsResult.error}</Flex>
  }

  if (patientRelationshipsResult.state === 'error') {
    return <Flex>{patientRelationshipsResult.error}</Flex>
  }
  if (preferredPartnerResult?.state === 'error') {
    return <Flex>{preferredPartnerResult.error}</Flex>
  }

  if (patientCardsResult?.state === 'error') {
    return <Flex>{patientCardsResult.error}</Flex>
  }

  if (patientPoliciesResult?.state === 'error') {
    return <div>{patientPoliciesResult.error}</div>
  }

  if (insurancePayersResult?.state === 'error') {
    return <Flex>{insurancePayersResult.error}</Flex>
  }
  if (patientFacesheetResult?.state === 'error') {
    return <Flex>{patientFacesheetResult.error}</Flex>
  }
  if (patientVisitsResult?.state === 'error') {
    return <Flex>{patientVisitsResult.error}</Flex>
  }

  return (
    <PatientInfoView
      googleApiKey={googleApiKey}
      patientId={patientId}
      stripeApiKey={stripeApiKey}
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

export { PatientInfoLoader }
