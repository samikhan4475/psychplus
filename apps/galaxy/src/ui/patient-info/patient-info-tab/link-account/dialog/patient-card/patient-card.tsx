'use client'

import { useEffect, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { getPatientProfileAction } from '@/actions'
import { LoadingPlaceholder } from '@/components'
import { PatientProfile } from '@/types'
import { PatientCardAvatar } from './avatar'
import { PatientCareTeamInfo } from './care-team-section'
import { PatientContactDetailsSection } from './contact-detail-section'
import { PatientCardInfoSection } from './info-section'
import { PatientCardInsuranceSection } from './insurance-section'
import { LabelAndValue } from './label-and-value'
import { PatientCardPCPSection } from './pcp-section'
import { PatientCardPharmacySection } from './pharmacy-section'
import { PatientCardVitalsSection } from './vitals-section'

interface PatientCardProps {
  patientId: string
}

const PatientCard = ({ patientId }: PatientCardProps) => {
  const [profileResponse, setProfileResponse] = useState<PatientProfile>()
  const [loading, setLoading] = useState(false)
  const fetcetchPatientDetails = async (patientId: string) => {
    setLoading(true)
    const profile = await getPatientProfileAction(patientId)
    if (profile.state === 'success') {
      setProfileResponse(profile.data)
    }
    setLoading(false)
  }
  useEffect(() => {
    fetcetchPatientDetails(patientId)
  }, [patientId])

  if (loading)
    return (
      <Flex height="100%" align="center" justify="center" mb={'8'}>
        <LoadingPlaceholder />
      </Flex>
    )

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
        <PatientCardAvatar patient={profileResponse} />
      </Flex>
      {profileResponse && <PatientCardInfoSection patient={profileResponse} />}

      <Flex direction="column" className="gap-[2px] md:flex-1">
        <PatientCardVitalsSection patientId={patientId} />
      </Flex>
      <Flex direction="column" className="gap-[2px] md:flex-1">
        <LabelAndValue label="CC on file" />
        <LabelAndValue label="Verify" />
        <PatientCardInsuranceSection patientId={patientId} />
        <PatientContactDetailsSection patient={profileResponse} />
      </Flex>
      <Flex direction="column" className="gap-[2px] md:flex-1">
        <PatientCareTeamInfo patientId={patientId} />
        <PatientCardPCPSection patientId={patientId} />
        <PatientCardPharmacySection patientId={patientId} />
      </Flex>
    </Flex>
  )
}
export { PatientCard }
