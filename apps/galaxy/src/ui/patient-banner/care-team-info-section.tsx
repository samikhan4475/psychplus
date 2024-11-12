import { Text } from '@radix-ui/themes'
import { getUserFullName } from '@/utils'
import { getPatientCareTeam } from './actions'
import { LabelAndValue } from './label-and-value'
import { PatientCare } from './types'

interface PatientBannerProps {
  patientId: string
}

const getPrimarySpecialistName = (
  careTeam: PatientCare[],
  specialist: string,
) => {
  const member = careTeam.find(
    (member) => member.primary && member.specialist === specialist,
  )
  return member ? getUserFullName(member.staffDetails.legalName) : undefined
}

const CareTeamInfoSection = async ({ patientId }: PatientBannerProps) => {
  const response = await getPatientCareTeam(patientId)

  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }

  const { careTeam } = response.data

  const psychiatrist = getPrimarySpecialistName(careTeam, 'Psychiatrist')
  const therapist = getPrimarySpecialistName(careTeam, 'Therapy')

  return (
    <>
      <LabelAndValue label="Psychiatrist" value={psychiatrist} />
      <LabelAndValue label="Therapist" value={therapist} />
    </>
  )
}

export { CareTeamInfoSection }
