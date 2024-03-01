'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Flex, Link, Text } from '@radix-ui/themes'
import { type CareTeam, type CareTeamMember } from '@psychplus/patient'
import { getPatientProfileImage } from '@psychplus/patient/api.client'
import { Avatar } from '@psychplus/ui/avatar'

const CareTeamCard = ({ careTeam }: { careTeam: CareTeam | undefined }) => {
  const psychiatrist = careTeam?.careTeam.find(
    (member) => member.primary && member.specialist === 'Psychiatrist',
  )
  const therapist = careTeam?.careTeam.find(
    (member) => member.primary && member.specialist === 'Therapist',
  )

  return (
    <Flex
      className="relative rounded-6 border border-gray-2 shadow-3"
      py="8"
      px="6"
      gap="7"
      direction="column"
    >
      <Text size="7" className="font-bold" align="center">
        Your Care Team
      </Text>
      {RenderTeamMember(psychiatrist, 'No psychiatrist available.')}

      {RenderTeamMember(therapist, 'No therapist available.')}
    </Flex>
  )
}

const RenderTeamMember = (
  teamMember: CareTeamMember | undefined,
  notAvailableMessage: string,
) => {
  const [profileImage, setProfileImage] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    if (teamMember) {
      getPatientProfileImage(teamMember.id).then(setProfileImage)
    }
  }, [teamMember?.id])

  if (!teamMember) {
    return (
      <Text className="font-bold" align="center">
        {notAvailableMessage}
      </Text>
    )
  }

  const redirectToScheduleAppointmentList = () => {
    const queryParams = {
      staffId: teamMember.staffDetails.id.toString(),
      providerType: teamMember.specialist,
      appointmentType: 'Virtual',
    }

    const queryString = new URLSearchParams(queryParams).toString()

    router.push(`/dashboard/schedule-appointment?${queryString}`)
  }

  return (
    <Flex direction="column" gap="3">
      <Flex gap="4" align="center">
        <Avatar
          size="6"
          src={profileImage}
          color="gray"
          fallback={teamMember.staffDetails.legalName.firstName[0] ?? 'A'}
          radius="full"
        />
        <Flex direction="column" gap="1" className="font-bold">
          <Text size="5">
            {`${teamMember.staffDetails.legalName.firstName}
            ${teamMember.staffDetails.legalName.lastName},
            ${teamMember.staffDetails.legalName.honors}`}
          </Text>
          <Text size="4" className="font-medium">
            {teamMember.specialist}
          </Text>
        </Flex>
      </Flex>
      <Button
        size="4"
        className="whitespace-nowrap font-bold"
        onClick={redirectToScheduleAppointmentList}
      >
        BOOK APPOINTMENT
      </Button>
      <Flex justify="end" mt="-2" className="font-medium">
        <Link size="4">Change Provider</Link>
      </Flex>
    </Flex>
  )
}

export { CareTeamCard }
