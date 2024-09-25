'use client'

import { Box, Flex, Text } from '@radix-ui/themes'
import { Details } from './details'
import { DrivingLicense } from './driving-license'
import { ProfilePicture } from './profile-picture'

const PatientDataCard = () => {
  return (
    <Flex direction="column">
      <Box className="bg-pp-table-subRows rounded-t-1" px="2">
        <Text size="2" weight="bold">
          Patient Data
        </Text>
      </Box>
      <Flex p="2" gap="5" align="center">
        <ProfilePicture />
        <Details />
        <DrivingLicense />
      </Flex>
    </Flex>
  )
}

export { PatientDataCard }
