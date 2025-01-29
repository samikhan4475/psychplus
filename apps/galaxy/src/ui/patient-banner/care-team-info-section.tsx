import { CareTeamMember } from '@/types/care-team'
import { getUserFullName } from '@/utils'
import { LabelAndValue } from './label-and-value'

interface CareTeamInfoSectionProps {
  careTeam?: CareTeamMember[]
}

const CareTeamInfoSection = ({ careTeam = [] }: CareTeamInfoSectionProps) => {
  const getPrimarySpecialistName = (specialist: string) => {
    const member = careTeam.find(
      (member) => member.primary && member.specialist === specialist,
    )
    return member ? getUserFullName(member.staffDetails.legalName) : undefined
  }

  const psychiatrist = getPrimarySpecialistName('Psychiatrist')
  const therapist = getPrimarySpecialistName('Therapy')

  return (
    <>
      <LabelAndValue label="Psychiatrist" value={psychiatrist} />
      <LabelAndValue label="Therapist" value={therapist} />
    </>
  )
}

export { CareTeamInfoSection }
