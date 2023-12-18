'use client'

import React from 'react'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { Flex, Text, Tooltip } from '@radix-ui/themes'
import { Avatar } from '@psychplus/ui/avatar'

//We will fetch this from API
const patientProfile = {
  firstName: 'Test',
  lastName: 'Denver',
  age: '24 yo',
  gender: 'M',
  profilePicUrl:
    'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop',
}

const PatientProfileCard = () => {
  return (
    <Flex
      className="relative rounded-6 border border-gray-2 shadow-3"
      align="center"
      py="8"
      px="6"
      gap="4"
    >
      <Tooltip content="Edit Profile" delayDuration={250}>
        <Flex
          className="absolute right-5 top-3 cursor-pointer text-blue-11"
          onClick={() => alert('Edit clicked')}
        >
          <Pencil2Icon height={22} width={22} />
        </Flex>
      </Tooltip>

      <Avatar
        size="6"
        src={patientProfile.profilePicUrl}
        fallback="A"
        radius="full"
      />

      <Flex direction="column" gap="1" className="font-bold">
        <Text size="7">
          {`${patientProfile.firstName} ${patientProfile.lastName}`}
        </Text>

        <Text size="2">{`${patientProfile.age} ${patientProfile.gender}`}</Text>
      </Flex>
    </Flex>
  )
}

export { PatientProfileCard }
