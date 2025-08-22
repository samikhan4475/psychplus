'use client'

import { Flex, Heading } from '@radix-ui/themes'

const ExperienceHeader = () => {
  return (
    <Flex py="2" px="4" className="bg-white z-[1]" position="sticky" top="0">
      <Heading size="5">Experience</Heading>
    </Flex>
  )
}

export { ExperienceHeader }
