'use client'

import React, { useEffect, useState } from 'react'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { Flex, Text, Tooltip } from '@radix-ui/themes'
import { type Patient } from '@psychplus/patient'
import { getPatientProfileImage } from '@psychplus/patient/api.client'
import { Avatar } from '@psychplus/ui/avatar'
import { calculateAge } from '@psychplus/utils/time'

const PatientProfileCard = ({ patient }: { patient: Patient | undefined }) => {
  const [profileImage, setProfileImage] = useState<string>('')

  useEffect(() => {
    getPatientProfileImage().then(setProfileImage)
  }, [])

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
        src={profileImage}
        color="gray"
        fallback={patient?.legalName.firstName[0] ?? 'A'}
        radius="full"
      />

      <Flex direction="column" gap="1" className="font-bold">
        <Text size="7">
          {`${patient?.legalName.firstName} ${patient?.legalName.lastName}`}
        </Text>

        <Text size="3">{calculateAge(patient?.birthdate)} yo</Text>
      </Flex>
    </Flex>
  )
}

export { PatientProfileCard }
