import { Flex, Text } from '@radix-ui/themes'
import { PatientProfile } from '@/types'
import { searchPharmaciesAction } from '../pharmacy/actions'
import {
  getInsuranceInfoAction,
  getPatientCareTeam,
  getPatientVitalsAction,
  getPcpInfoAction,
} from './actions'
import { CareTeamInfoSection } from './care-team-info-section'
import { InsuranceInfoSection } from './insurance-info-section'
import { LabelAndValue } from './label-and-value'
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
    const [
      vitalsResponse,
      insuranceResponse,
      careTeamResponse,
      pcpResponse,
      pharmacyResponse,
    ] = await Promise.all([
      getPatientVitalsAction(patientId),
      getInsuranceInfoAction(patientId),
      getPatientCareTeam(patientId),
      getPcpInfoAction(patientId),
      searchPharmaciesAction(patientId, { isOnlyDefaults: true }),
    ])

    if (
      vitalsResponse.state === 'error' ||
      insuranceResponse.state === 'error' ||
      careTeamResponse.state === 'error' ||
      pcpResponse.state === 'error' ||
      pharmacyResponse.state === 'error'
    ) {
      return <Text>Failed to load patient data.</Text>
    }

    const vitals = vitalsResponse.data[vitalsResponse.data.length - 1]
    const insurance =
      insuranceResponse.data[insuranceResponse.data.length - 1]
        .insurancePolicies ?? []
    const careTeam = careTeamResponse.data.careTeam
    const pcp = pcpResponse.data[pcpResponse.data.length - 1]
    const pharmacy = pharmacyResponse.data[0]

    return (
      <Flex
        gap="3"
        py="4"
        px="5"
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
        <UserInfoSection user={user} />
        <Flex direction="column" className="gap-[2px] md:flex-1">
          <VitalsInfoSection vitals={vitals} />
        </Flex>
        <Flex direction="column" className="gap-[2px] md:flex-1">
          <LabelAndValue label="CC on file" />
          <LabelAndValue label="Verify" />
          <InsuranceInfoSection insurance={insurance} />
          <UserContactDetailsSection user={user} />
        </Flex>
        <Flex direction="column" className="gap-[2px] md:flex-1">
          <CareTeamInfoSection careTeam={careTeam} />
          <PcpInfoSection pcp={pcp} />
          <PharmacyInfoSection pharmacy={pharmacy} />
        </Flex>
      </Flex>
    )
  } catch (error) {
    return <Text>Error loading patient banner</Text>
  }
}

export { PatientBanner }
