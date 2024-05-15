import React from 'react'
import NextLink from 'next/link'
import { cn } from '@psychplus-v2/utils'
import { Box, Flex, Link, Text } from '@radix-ui/themes'
import { PsychPlusIcon } from './psych-plus-icon'

interface PsychPlusNavLogoProps {
  responsive?: boolean
  textClassName?: string
  logoClassName?: string
}

const PsychPlusNavLogo = ({
  responsive,
  textClassName,
  logoClassName,
}: PsychPlusNavLogoProps) => (
  <Link className="no-underline" asChild>
    <NextLink href="/">
      <Flex align="center">
        <PsychPlusIcon />
        <span className="sr-only">PsychPlus navigation logo</span>
      </Flex>
    </NextLink>
  </Link>
)

export { PsychPlusNavLogo }
