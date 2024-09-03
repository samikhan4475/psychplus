'use client'

import { useEffect, useState } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { type ActionResult } from '@/api'
import { PatientConsent } from '@/types'
import { POLICY_TYPE_A } from '../constants'
import { TabContentHeading, ViewLoadingPlaceholder } from '../shared'
import { getPatientConsentsAction, getPatientProfileAction } from './actions'
import { AdditionalContactInfoCard } from './additional-contact-info'
import { CreateUserCard } from './create-user'
import { DescriptiveCard } from './descriptive'
import { HistoryButton } from './history-button'
import { PatientInfoForm } from './patient-info-form'
import { ResetPasswordButton } from './reset-password-button'
import { SaveButton } from './save-button'
import { StatusSelector } from './status-selector'
import type { PatientProfile } from './types'

const TAB_TITLE = 'Patient Info'

interface PatientInfoTabProps {
  patientId: string
}

const PatientInfoTab = ({ patientId }: PatientInfoTabProps) => {
  const [profileResult, setProfileResult] =
    useState<ActionResult<PatientProfile>>()
  const [consentsResult, setConsentsResult] =
    useState<ActionResult<PatientConsent[]>>()

  useEffect(() => {
    const actions = [
      getPatientProfileAction(patientId),
      getPatientConsentsAction(patientId),
    ]

    Promise.all(actions).then(([profileResult, consentsResult]) => {
      setProfileResult(profileResult as ActionResult<PatientProfile>)
      setConsentsResult(consentsResult as ActionResult<PatientConsent[]>)
    })
  }, [patientId])

  if (!profileResult || !consentsResult) {
    return <ViewLoadingPlaceholder title={TAB_TITLE} />
  }

  if (profileResult.state === 'error') {
    return <div>{profileResult.error}</div>
  }

  if (consentsResult.state === 'error') {
    return <div>{consentsResult.error}</div>
  }

  const isPolicySigned = consentsResult.data.some(
    (consent) => consent.signingDate && consent.type === POLICY_TYPE_A,
  )

  return (
    <>
      <TabContentHeading title={TAB_TITLE}>
        <Flex align="center" justify="end" gap="2" className="flex-1">
          <Text className="text-[13px] font-[400]">Verification Status</Text>
          <StatusSelector />
          <HistoryButton />
          <ResetPasswordButton />
          <SaveButton />
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
          {/* <PatientDataCard patientId={patientId} />
          <UserAddressCard patientId={patientId} /> */}

          {/* Preferred Partner
          RelationShip */}
          <AdditionalContactInfoCard patientId={patientId} />
          {/* 
          Alternate/Previous Infor */}
          {/* <RelationshipCard patientId={patientId} /> */}
          <DescriptiveCard patientId={patientId} />
        </Flex>
      </PatientInfoForm>
    </>
  )
}

export { PatientInfoTab }
