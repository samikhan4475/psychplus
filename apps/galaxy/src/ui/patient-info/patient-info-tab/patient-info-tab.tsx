'use client'

import { useMemo, useState } from 'react'
import { Box, Flex, ScrollArea } from '@radix-ui/themes'
// import { ResetPasswordButton } from './reset-password-button'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { GooglePlacesContextProvider } from '@/providers/google-places-provider'
import {
  PatientConsent,
  PatientPreferredPartner,
  PatientProfile,
  Relationship,
} from '@/types'
import { PolicyConsentDialog } from '@/ui/quicknotes/policy-consent-dialog'
import { useStore } from '@/ui/quicknotes/store'
import { POLICY_TYPE_A, POLICY_TYPE_B } from '../constants'
import { TabContentHeading } from '../shared'
import { AdditionalContactInfoCard } from './additional-contact-info'
import { AlternativeInfoCard } from './alternate-info'
import { CreateUserCard } from './create-user'
import { DescriptiveCard } from './descriptive'
import { LinkAccountCard } from './link-account'
// import { LinkAccountCard } from './link-account'
import { LockPageSwitch } from './lock-page-switch'
import { PatientDataCard } from './patient-data'
import { PatientHistoryDialog } from './patient-history-dialog'
import { PatientInfoForm } from './patient-info-form'
import { PreferredPartnerCard } from './preferred-partner'
import { RelationshipCard } from './relationship'
import { SaveButton } from './save-button'
import { StatusSelect } from './status-selector'
import { TestPatientCheckbox } from './test-patient-checkbox'
import { AddressCard } from './user-address'

const TAB_TITLE = 'Patient Info'

interface PatientInfoTabProps {
  patientId: string
  googleApiKey: string
  patientProfile: PatientProfile
  patientPreferredPartners: PatientPreferredPartner[]
  patientRelationships: Relationship[]
  patientConsents: PatientConsent[]
}

const PatientInfoTab = ({
  patientId,
  googleApiKey,
  patientProfile,
  patientPreferredPartners,
  patientRelationships,
  patientConsents,
}: PatientInfoTabProps) => {
  const [profileImage, setProfileImage] = useState<File | undefined>(undefined)
  const [driverLicenseImage, setDriverLicenseImage] = useState<
    File | undefined
  >(undefined)
  const codes = useCodesetCodes(CODESETS.PatientConsentPolicyType)
  const { patient } = useStore((state) => ({
    patient: state.patient,
  }))

  const patientConsent = patient.patientConsent === 'Unverifiable'
  const [isPolicyAlertOpen, setIsPolicyAlertOpen] = useState(patientConsent)

  const patientPolicyA = patientConsents?.find(
    (consent) => consent?.type === POLICY_TYPE_A,
  )
  const patientPolicyB = patientConsents.find(
    (consent) => consent.type === POLICY_TYPE_B,
  )

  const policyDescriptions = useMemo(() => {
    const notVerifiedPolicyTypes = patientConsents
      .filter((policy) => policy.verificationStatus === 'Unverifiable')
      .map((policy) => policy.type)

    return notVerifiedPolicyTypes
      .map((type) => {
        const policy = codes.find((code) => code.value === type)
        return policy
          ? policy.attributes?.find((attr) => attr.name === 'PolicyName')?.value
          : null
      })
      .filter(Boolean)
  }, [patientConsents])

  return (
    <Box position="relative">
      <LockPageSwitch patient={patientProfile} />
      <GooglePlacesContextProvider apiKey={googleApiKey}>
        <PatientInfoForm
          patient={patientProfile}
          profileImage={profileImage}
          driverLicenseImage={driverLicenseImage}
        >
          <TabContentHeading title={TAB_TITLE}>
            <Flex align="center" justify="end" gap="2" className="flex-1">
              <TestPatientCheckbox />
              <StatusSelect />
              <PatientHistoryDialog
                patientId={patientId}
                patientPolicyAStatus={patientPolicyA?.verificationStatus}
              />
              {/* <ResetPasswordButton /> */}
              <SaveButton />
            </Flex>
          </TabContentHeading>
          <ScrollArea className="max-h-[calc(100dvh-340px)]">
            <Flex direction="column" gap="2">
              <CreateUserCard
                patientId={patientId}
                patientPolicyAStatus={patientPolicyA?.verificationStatus}
                patientPolicyBStatus={patientPolicyB?.verificationStatus}
              />
              <PatientDataCard
                patientId={patientId}
                setProfileImage={setProfileImage}
                setDriverLicenseImage={setDriverLicenseImage}
              />
              <AddressCard />
              <LinkAccountCard patientId={patientId} lintAccounts={[]} />
              <PreferredPartnerCard
                preferredPartners={patientPreferredPartners ?? []}
              />
              <RelationshipCard
                patientId={patientId}
                patientRelationships={patientRelationships ?? []}
              />
              <AdditionalContactInfoCard />
              <AlternativeInfoCard />
              <DescriptiveCard />
            </Flex>
          </ScrollArea>
        </PatientInfoForm>
        {patient.patientConsent !== 'Verified' &&
          policyDescriptions?.length > 0 && (
            <PolicyConsentDialog
              open={isPolicyAlertOpen}
              onOpenChange={setIsPolicyAlertOpen}
              title=""
              message={`Patient needs to sign policy: ${policyDescriptions.join(
                ', ',
              )}`}
              patientId={patientId}
            />
          )}
      </GooglePlacesContextProvider>
    </Box>
  )
}

export { PatientInfoTab }
