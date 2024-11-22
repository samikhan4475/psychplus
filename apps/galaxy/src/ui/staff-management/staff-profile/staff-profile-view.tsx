import React from 'react'
import { Flex } from '@radix-ui/themes'
import { StaffProfileForm } from './staff-profile-form'

interface StaffProfileViewProps {
  googleApiKey: string
}

const StaffProfileView = ({ googleApiKey }: StaffProfileViewProps) => {
  return (
    <Flex
      gap="1"
      className="bg-pp-bg-accent flex-1 !overflow-hidden"
      direction="column"
    >
      <StaffProfileForm googleApiKey={googleApiKey} />
    </Flex>
  )
}

export { StaffProfileView }
