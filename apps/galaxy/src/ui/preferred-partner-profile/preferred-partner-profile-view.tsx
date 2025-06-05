import React from 'react'
import { Flex } from '@radix-ui/themes'
import { PreferredPartnerItem } from '../preferred-partner/types'
import { PreferredPartnerProfileForm } from './preferred-partner-profile-form'

interface PreferredPartnerProfileViewProps {
  profile: PreferredPartnerItem
  googleApiKey: string
}

const PreferredPartnerProfileView = ({
  profile,
  googleApiKey,
}: PreferredPartnerProfileViewProps) => {
  return (
    <Flex
      gap="1"
      className="bg-pp-bg-accent flex-1 !overflow-hidden"
      direction="column"
    >
      <PreferredPartnerProfileForm
        profile={profile}
        googleApiKey={googleApiKey}
      />
    </Flex>
  )
}

export { PreferredPartnerProfileView }
