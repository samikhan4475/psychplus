'use client'

import NextLink from 'next/link'
import { Button, Flex, Heading, Text } from '@radix-ui/themes'
import { MoveRightIcon } from 'lucide-react'
import { ViewContainer } from '@/components-v2'

const RootError = () => {
  return (
    <ViewContainer className="flex-1">
      <Flex
        direction="column"
        align="center"
        justify="center"
        height="100%"
        gap="5"
        px="5"
      >
        <Flex direction="column" gap="2">
          <Heading as="h1" size="8" align="center" className="text-accent-12">
            Oops!
          </Heading>
          <Text
            align="center"
            className="max-w-[400px] text-[17px] text-gray-11"
          >
            Something has gone wrong. It&apos;s not you - it&apos;s us, and
            we&apos;re working on fixing the issue. Please refresh the page or
            try again later.
          </Text>
        </Flex>
        <Button size="4" asChild highContrast>
          <NextLink href="/">
            Take me home <MoveRightIcon />
          </NextLink>
        </Button>
      </Flex>
    </ViewContainer>
  )
}

export default RootError
