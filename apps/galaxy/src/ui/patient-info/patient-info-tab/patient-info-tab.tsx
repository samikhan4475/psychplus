'use client'

import { Flex } from '@radix-ui/themes'
import { PatientConsent, Relationship } from '@/types'
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
import { ResetPasswordButton } from './reset-password-button'
import { SaveButton } from './save-button'
import { StatusSelector } from './status-selector'
import { PatientPreferredPartner, type PatientProfile } from './types'
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
  const isPolicySigned = patientConsents.some(
    (consent) => consent.signingDate && consent.type === POLICY_TYPE_A,
  )

  return (
    <>
      <TabContentHeading title={TAB_TITLE}>
        <Flex
          align="center"
          justify="between"
          gap="2"
          className="flex-1"
          pl="4"
        >
          <LockPageSwitch />
          <Flex align="center" justify="end" gap="2" className="flex-1">
            <StatusSelector />
            <PatientHistoryDialog />
            <ResetPasswordButton />
            <SaveButton />
          </Flex>
        </Flex>
      </TabContentHeading>
      <PatientInfoForm patient={patientProfile}>
        <Flex direction="column" gap="2">
          <CreateUserCard
            patientId={patientId}
            phone={patientProfile.phone}
            email={patientProfile.email}
            isPolicySigned={isPolicySigned}
          />
          <PatientDataCard patientId={patientId} />
          <AddressCard googleApiKey={googleApiKey} />
          <PreferredPartnerCard
            preferredPartners={patientPreferredPartners ?? []}
          />
          <RelationshipCard
            patientId={patientId}
            patientRelationships={patientRelationships ?? []}
          />
          <AdditionalContactInfoCard patientId={patientId} />
          <AlternativeInfoCard googleApiKey={googleApiKey} />
          <DescriptiveCard patientId={patientId} />
        </Flex>
      </PatientInfoForm>
    </>
  )
}

export { PatientInfoTab }
