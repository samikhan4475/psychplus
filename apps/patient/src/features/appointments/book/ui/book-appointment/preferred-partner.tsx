'use client'

import { Flex, Text } from '@radix-ui/themes'
import { Check } from 'lucide-react'

const PreferredPartnerSection = () => {
  return (
    <Flex
      gap="2"
      align="start"
      className="rounded-3 border border-[#92CEAC] bg-[#E9F9EE] p-3"
    >
      <Flex
        align="center"
        justify="center"
        className="rounded-full size-[22px] shrink-0 border border-[#92CEAC]"
      >
        <Flex
          align="center"
          justify="center"
          className="rounded-full size-[16px] bg-[#18794E]"
        >
          <Check className="text-white size-[14px]" />
        </Flex>
      </Flex>
      <Flex direction="column" gap="1">
        <Text
          size={{ initial: '1', sm: '2' }}
          weight="bold"
          className="text-[#1C2024]"
        >
          Preferred partner program applied
        </Text>
        <Text size={{ initial: '2', sm: '3' }} className="text-[#60646C]">
          You are enrolled in preferred partner program by your employer.
        </Text>
      </Flex>
    </Flex>
  )
}

export default PreferredPartnerSection
