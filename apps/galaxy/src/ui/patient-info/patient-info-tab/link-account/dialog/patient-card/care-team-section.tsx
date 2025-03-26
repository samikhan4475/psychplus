import { useEffect, useState } from 'react'
import { CareTeamMember } from '@/types/care-team'
import { getUserFullName } from '@/utils'
import { getPatientCareTeam } from '../../actions'
import { LabelAndValue } from './label-and-value'

interface PatientCareTeamInfoProps {
  patientId: string
}

const PatientCareTeamInfo = ({ patientId }: PatientCareTeamInfoProps) => {
  const [careTeamResponse, setCareTeamResponse] = useState<CareTeamMember[]>()

  const fetchPatientCareTeams = async () => {
    const careTeamdata = await getPatientCareTeam(patientId)
    if (careTeamdata.state === 'success') {
      setCareTeamResponse(careTeamdata?.data?.careTeam)
    }
  }
  useEffect(() => {
    fetchPatientCareTeams()
  }, [patientId])

  const getPrimarySpecialistName = (specialist: string) => {
    const member = careTeamResponse?.find(
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

export { PatientCareTeamInfo }
