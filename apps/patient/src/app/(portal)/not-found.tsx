import NextLink from 'next/link'
import { Button, Flex, Heading, Text } from '@radix-ui/themes'
import { MoveRightIcon } from 'lucide-react'
import { ViewContainer } from '@/components-v2'

const RootNotFound = () => {
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
            404 Oops!
          </Heading>
          <Text
            align="center"
            className="max-w-[400px] text-[17px] text-gray-11"
          >
            The page you&apos;re looking for could not be found. We&apos;ll help
            you get back on track.
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

export default RootNotFound
