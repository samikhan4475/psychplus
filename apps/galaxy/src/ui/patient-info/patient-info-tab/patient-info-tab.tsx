'use client'

import { useEffect, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { type ActionResult } from '@/api'
import { PatientConsent, Relationship } from '@/types'
import { POLICY_TYPE_A } from '../constants'
import { TabContentHeading, ViewLoadingPlaceholder } from '../shared'
import {
  getPatientConsentsAction,
  getPatientPreferredPartnersAction,
  getPatientProfileAction,
  getPatientRelationshipsAction,
} from './actions'
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
}

const PatientInfoTab = ({ patientId, googleApiKey }: PatientInfoTabProps) => {
  const [profileResult, setProfileResult] =
    useState<ActionResult<PatientProfile>>()
  const [consentsResult, setConsentsResult] =
    useState<ActionResult<PatientConsent[]>>()
  const [patientRelationships, setPatientRelationships] =
    useState<ActionResult<Relationship[]>>()
  const [preferredPartnerResult, setPreferredPartnerResult] =
    useState<ActionResult<PatientPreferredPartner[]>>()

  useEffect(() => {
    const actions = [
      getPatientProfileAction(patientId),
      getPatientConsentsAction(patientId),
      getPatientRelationshipsAction(patientId),
      getPatientPreferredPartnersAction(patientId),
    ]

    Promise.all(actions).then(
      ([
        profileResult,
        consentsResult,
        patientRelationshipsResult,
        preferredPartnerResult,
      ]) => {
        setProfileResult(profileResult as ActionResult<PatientProfile>)
        setConsentsResult(consentsResult as ActionResult<PatientConsent[]>)
        setPatientRelationships(
          patientRelationshipsResult as ActionResult<Relationship[]>,
        )
        setPreferredPartnerResult(
          preferredPartnerResult as ActionResult<PatientPreferredPartner[]>,
        )
      },
    )
  }, [patientId])

  if (!profileResult || !consentsResult || !patientRelationships) {
    return <ViewLoadingPlaceholder title={TAB_TITLE} />
  }

  if (profileResult.state === 'error') {
    return <div>{profileResult.error}</div>
  }

  if (consentsResult.state === 'error') {
    return <div>{consentsResult.error}</div>
  }

  if (patientRelationships.state === 'error') {
    return <div>{patientRelationships.error}</div>
  }
  if (preferredPartnerResult?.state === 'error') {
    return <div>{preferredPartnerResult.error}</div>
  }
  const isPolicySigned = consentsResult.data.some(
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
      <PatientInfoForm patient={profileResult.data}>
        <Flex direction="column" gap="2">
          <CreateUserCard
            patientId={patientId}
            phone={profileResult.data.phone}
            email={profileResult.data.email}
            isPolicySigned={isPolicySigned}
          />
          <PatientDataCard patientId={patientId} />
          <AddressCard googleApiKey={googleApiKey} />
          <PreferredPartnerCard
            preferredPartners={preferredPartnerResult?.data ?? []}
          />
          <RelationshipCard patientRelationships={patientRelationships.data} />
          <AdditionalContactInfoCard patientId={patientId} />
          <AlternativeInfoCard googleApiKey={googleApiKey} />
          <DescriptiveCard patientId={patientId} />
        </Flex>
      </PatientInfoForm>
    </>
  )
}

export { PatientInfoTab }
