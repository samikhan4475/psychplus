'use client'

import React from 'react'
import { Button, Flex, Link, Text } from '@radix-ui/themes'
import { Avatar } from '@psychplus/ui/avatar'

type TeamMember = {
  name: string
  credentials: string
  type: string
  profilePicUrl: string
}

// We will fetch this from API
const careTeam: TeamMember[] = [
  {
    name: 'DR TEST3',
    credentials: 'MD',
    type: 'Psychiatrist',
    profilePicUrl:
      'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop',
  },
  {
    name: 'test luke',
    credentials: 'LCP',
    type: 'Therapist',
    profilePicUrl:
      'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop',
  },
]

const CareTeamCard = () => {
  const psychiatrist = careTeam.find((member) => member.type === 'Psychiatrist')
  const therapist = careTeam.find((member) => member.type === 'Therapist')

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
      {renderTeamMember(psychiatrist, 'No psychiatrist available.')}

      {renderTeamMember(therapist, 'No therapist available.')}
    </Flex>
  )
}

const renderTeamMember = (
  teamMember?: TeamMember,
  notAvailableMessage = 'Not available.',
) => {
  if (!teamMember) {
    return (
      <Text className="font-bold" align="center">
        {notAvailableMessage}
      </Text>
    )
  }

  return (
    <Flex direction="column" gap="3">
      <Flex gap="4" align="center">
        <Avatar
          size="6"
          src={teamMember.profilePicUrl}
          fallback="A"
          radius="full"
        />
        <Flex direction="column" gap="1" className="font-bold">
          <Text size="5">{`${teamMember.name}, ${teamMember.credentials}`}</Text>
          <Text size="2">{teamMember.type}</Text>
        </Flex>
      </Flex>
      <Button size="3" color="blue" className="whitespace-nowrap">
        BOOK APPOINTMENT
      </Button>
      <Flex justify="end" mt="-2" className="font-bold">
        <Link color="blue" size="2">
          Change Provider
        </Link>
      </Flex>
    </Flex>
  )
}

export { CareTeamCard }
