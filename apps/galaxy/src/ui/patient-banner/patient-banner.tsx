import { Flex, Text } from '@radix-ui/themes'
import { getPatientProfile } from '@/api'
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
}

const PatientBanner = async ({ patientId }: PatientBannerProps) => {
  const response = await getPatientProfile(patientId)
  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }

  const user = response.data

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
        <VitalsInfoSection patientId={patientId} />
      </Flex>
      <Flex direction="column" className="gap-[2px] md:flex-1">
        <LabelAndValue label="CC on file" />
        <LabelAndValue label="Verify" />
        <InsuranceInfoSection patientId={patientId} />
        <UserContactDetailsSection user={user} />
      </Flex>
      <Flex direction="column" className="gap-[2px] md:flex-1">
        <CareTeamInfoSection patientId={patientId} />
        <PcpInfoSection patientId={patientId} />
        <PharmacyInfoSection patientId={patientId} />
      </Flex>
    </Flex>
  )
}

export { PatientBanner }
