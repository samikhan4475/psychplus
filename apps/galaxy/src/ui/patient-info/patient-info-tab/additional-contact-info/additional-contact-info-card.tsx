'use client'

import { Flex } from '@radix-ui/themes'
import { CardHeading } from '@/components'
import { HomePhoneCommentInput } from './home-phone-comment'
import { HomePhoneExtInput } from './home-phone-ext-input'
import { HomePhoneInput } from './home-phone-input'
import { WorkPhoneCommentInput } from './work-phone-comment'
import { WorkPhoneExtInput } from './work-phone-ext-input'
import { WorkPhoneInput } from './work-phone-input'

interface AdditionalContactInfoCardProps {
  patientId: string
}

const AdditionalContactInfoCard = ({
  patientId,
}: AdditionalContactInfoCardProps) => {
  return (
    <Flex direction="column" className="bg-white shadow-2">
      <CardHeading title="Additional Contact Info" />
      <Flex direction="column" px="2" py="2" gap="2">
        <Flex align="start" gap="2">
          <HomePhoneInput />
          <HomePhoneExtInput />
          <HomePhoneCommentInput />
          <WorkPhoneInput />
          <WorkPhoneExtInput />
          <WorkPhoneCommentInput />
        </Flex>
      </Flex>
    </Flex>
  )
}

export { AdditionalContactInfoCard }
