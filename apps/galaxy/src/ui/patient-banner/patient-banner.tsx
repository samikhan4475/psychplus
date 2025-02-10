import { Flex, Text } from '@radix-ui/themes'
import { PatientProfile } from '@/types'
import { searchPharmaciesAction } from '../pharmacy/actions'
import {
  getPatientCareTeam,
  getPatientVitalsAction,
  getPcpInfoAction,
} from './actions'
import { CareTeamInfoSection } from './care-team-info-section'
import { InsuranceInfoSection } from './insurance-info-section'
import { LabelAndValue } from './label-and-value'
import { PatientVerification } from './patient-verification'
import { PcpInfoSection } from './pcp-info-section'
import { PharmacyInfoSection } from './pharmacy-info-section'
import { UserAvatar } from './user-avatar'
import { UserContactDetailsSection } from './user-contact-details-section'
import { UserInfoSection } from './user-info-section'
import { VitalsInfoSection } from './vitals-info-section'

interface PatientBannerProps {
  patientId: string
  user: PatientProfile
}

const PatientBanner = async ({ patientId, user }: PatientBannerProps) => {
  try {
    const [vitalsResponse, careTeamResponse, pcpResponse, pharmacyResponse] =
      await Promise.allSettled([
        getPatientVitalsAction(patientId),
        getPatientCareTeam(patientId),
        getPcpInfoAction(patientId),
        searchPharmaciesAction(patientId, { isOnlyDefaults: true }),
      ])

    const vitals =
      vitalsResponse.status === 'fulfilled' &&
      vitalsResponse.value.state !== 'error'
        ? vitalsResponse.value.data
        : undefined

    const careTeam =
      careTeamResponse.status === 'fulfilled' &&
      careTeamResponse.value.state !== 'error'
        ? careTeamResponse.value.data.careTeam
        : undefined

    const pcp =
      pcpResponse.status === 'fulfilled' && pcpResponse.value.state !== 'error'
        ? pcpResponse.value.data[pcpResponse.value.data.length - 1]
        : undefined

    const pharmacy =
      pharmacyResponse.status === 'fulfilled' &&
      pharmacyResponse.value.state !== 'error'
        ? pharmacyResponse.value.data[0]
        : undefined

    const { creditCardVerificationStatus, insurancePolicies } = user
    const insuranse = insurancePolicies ?? []

    const isCreditCardOnFile = (status?: string): string =>
      status === 'Active' ? 'Yes' : 'No'

    return (
      <Flex
        gap="3"
        py="2"
        px="3"
        wrap="wrap"
        direction={{
          md: 'row',
        }}
        justify="start"
        className="bg-white border-b border-b-gray-5"
      >
        <Flex mr="6">
          <UserAvatar user={user} />
        </Flex>
        <UserInfoSection user={user} vitals={vitals} />
        <Flex direction="column" className="gap-[2px] md:flex-1">
          <VitalsInfoSection vitals={vitals} />
        </Flex>
        <Flex direction="column" className="gap-[2px] md:flex-1">
          <LabelAndValue label="BMI" value={vitals?.bodyMassIndex} />
          <LabelAndValue
            label="CC on file"
            value={isCreditCardOnFile(creditCardVerificationStatus)}
          />
          <PatientVerification patientVerifications={user} />
        </Flex>
        <Flex direction="column" className="gap-[2px] md:flex-1">
          <InsuranceInfoSection insurance={insuranse} />
          <UserContactDetailsSection user={user} />
        </Flex>
        <Flex direction="column" className="gap-[2px] md:flex-1">
          <CareTeamInfoSection careTeam={careTeam} />
          <PcpInfoSection pcp={pcp} />
        </Flex>
        <Flex direction="column" className="gap-[2px] md:flex-1">
          <PharmacyInfoSection pharmacy={pharmacy} />
        </Flex>
      </Flex>
    )
  } catch (error) {
    return <Text>Error loading patient banner</Text>
  }
}

export { PatientBanner }
