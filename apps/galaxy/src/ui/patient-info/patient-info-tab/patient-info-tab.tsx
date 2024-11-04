'use client'

import { useState } from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { GooglePlacesContextProvider } from '@/providers/google-places-provider'
import {
  PatientConsent,
  PatientPreferredPartner,
  PatientProfile,
  Relationship,
} from '@/types'
import { POLICY_TYPE_A } from '../constants'
import { TabContentHeading } from '../shared'
import { AdditionalContactInfoCard } from './additional-contact-info'
import { AlternativeInfoCard } from './alternate-info'
import { CreateUserCard } from './create-user'
import { DescriptiveCard } from './descriptive'
import { LockPageSwitch } from './lock-page-switch'
import { PatientDataCard } from './patient-data'
import { PatientHistoryDialog } from './patient-history-dialog'
import { PatientInfoForm } from './patient-info-form'
import { PreferredPartnerCard } from './preferred-partner'
import { RelationshipCard } from './relationship'
// import { ResetPasswordButton } from './reset-password-button'
import { SaveButton } from './save-button'
import { StatusSelect } from './status-selector'
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

  const patientPolicyA = patientConsents?.find(
    (consent) => consent?.type === POLICY_TYPE_A,
  )

  return (
    <Box position="relative">
      <LockPageSwitch />
      <GooglePlacesContextProvider apiKey={googleApiKey}>
        <PatientInfoForm
          patient={patientProfile}
          profileImage={profileImage}
          driverLicenseImage={driverLicenseImage}
        >
          <TabContentHeading title={TAB_TITLE}>
            <Flex align="center" justify="end" gap="2" className="flex-1">
              <StatusSelect />
              <PatientHistoryDialog
                patientId={patientId}
                patientPolicyAStatus={patientPolicyA?.verificationStatus}
              />
              {/* <ResetPasswordButton /> */}
              <SaveButton />
            </Flex>
          </TabContentHeading>

          <Flex direction="column" gap="2">
            <CreateUserCard
              patientId={patientId}
              patientPolicyAStatus={patientPolicyA?.verificationStatus}
            />
            <PatientDataCard
              patientId={patientId}
              setProfileImage={setProfileImage}
              setDriverLicenseImage={setDriverLicenseImage}
            />
            <AddressCard />
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
        </PatientInfoForm>
      </GooglePlacesContextProvider>
    </Box>
  )
}

export { PatientInfoTab }
