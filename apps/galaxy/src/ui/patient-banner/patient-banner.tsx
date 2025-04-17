import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { CloseIcon, TickIcon } from '@/components/icons'
import { PatientProfile } from '@/types'
import { formatUTCDate, getUserFullName } from '@/utils'
import { ExternalProviderDetail } from '../pcp'
import { getPatientDemographicsAction } from './actions/get-patient-demographics'
import { CareTeamInfoSection } from './care-team-info-section'
import { InsuranceInfoSection } from './insurance-info-section'
import { LabelAndValue } from './label-and-value'
import { PatientVerification } from './patient-verification'
import { ResidingState } from './residing-state'
import { UserAvatar } from './user-avatar'
import { UserInfoSection } from './user-info-section'
import { VitalsInfoSection } from './vitals-info-section'

interface PatientDemographicsProps {
  patientId: string
  appointmentId?: string
  user: PatientProfile
}

const PatientInfoSection = ({
  user,
  error,
}: {
  user: PatientProfile
  error?: string
}) => {
  return (
    <Flex
      gap="3"
      py="2"
      px="3"
      wrap="wrap"
      direction={{ md: 'row' }}
      justify="start"
      className="bg-white"
    >
      <Flex mr="6">
        <UserAvatar user={user} />
      </Flex>
      <UserInfoSection user={user} />
      {error && <Text>{error}</Text>}
    </Flex>
  )
}
const PatientBanner = async ({
  patientId,
  appointmentId = '',
  user,
}: PatientDemographicsProps) => {
  const response = await getPatientDemographicsAction({
    patientId,
    appointmentId,
  })

  if (response.state === 'error') {
    return <PatientInfoSection user={user} error={response.error} />
  }

  const patientDemographicsData = response.data

  const primaryCareExternalProviderLegalName =
    patientDemographicsData?.externalProviders?.find(
      (provider) => provider.relationship === 'PrimaryCare',
    )?.externalProvider?.legalName

  return (
    <Flex
      gap="3"
      py="2"
      px="3"
      wrap="wrap"
      direction={{ md: 'row' }}
      justify="start"
      className="bg-white border-b border-b-gray-5"
    >
      <PatientInfoSection user={user} />
      <Flex direction="column" className="gap-[2px] md:flex-1">
        <VitalsInfoSection
          vitals={patientDemographicsData?.vitals?.[0]}
          patientId={patientId}
        />
      </Flex>
      <Flex direction="column" className="gap-[2px] md:flex-1">
        <InsuranceInfoSection insurance={user?.insurancePolicies || []} />
        <PatientVerification patientVerifications={user} />
        <ResidingState
          stateCode={patientDemographicsData?.appointment?.stateCode ?? ''}
        />
      </Flex>
      <Flex direction="column" className="gap-[2px] md:flex-1">
        <CareTeamInfoSection careTeam={patientDemographicsData?.careTeam} />
        <LabelAndValue
          label="PCP"
          value={
            primaryCareExternalProviderLegalName
              ? getUserFullName(primaryCareExternalProviderLegalName)
              : 'N/A'
          }
        />
      </Flex>
      <Flex direction="column" className="gap-[2px] md:flex-1">
        <LabelAndValue
          label="Allergies"
          value={
            patientDemographicsData?.allergies?.length
              ? patientDemographicsData?.allergies
                  .map((el) => el.allergyName)
                  .join(', ')
              : 'No known Allergies'
          }
          showValueInsideTooltip
        />
        <LabelAndValue
          label="Pharmacy Name"
          value={
            patientDemographicsData?.pharmacies?.[0]?.pharmacyName ?? 'N/A'
          }
        />
        <Flex gap="1" className="whitespace-nowrap" align="center">
          <Text className="text-[11.5px] font-[600]">Primary Note Signed</Text>
          {patientDemographicsData?.appointment?.isQuickNoteSigned ? (
            <TickIcon height={11} width={11} />
          ) : (
            <CloseIcon height={11} width={11} />
          )}
        </Flex>
        <LabelAndValue
          label="Last Seen"
          value={
            patientDemographicsData?.appointment?.lastSeenByProvider &&
            patientDemographicsData?.appointment?.providerFullName
              ? `${formatUTCDate(
                  patientDemographicsData?.appointment?.lastSeenByProvider,
                )} ${
                  patientDemographicsData?.appointment?.lastSeenByProviderName
                    ?.firstName
                } ${
                  patientDemographicsData?.appointment?.lastSeenByProviderName
                    ?.lastName
                }, ${
                  patientDemographicsData?.appointment?.lastSeenByProviderName
                    ?.honors
                } `
              : 'N/A'
          }
        />
      </Flex>
    </Flex>
  )
}

export { PatientBanner }
