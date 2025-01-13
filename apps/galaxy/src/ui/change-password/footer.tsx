import NextLink from 'next/link'
import { Flex, Text } from '@radix-ui/themes'

const Footer = () => {
  return (
    <Flex className="mt-6 justify-center text-center">
      <Text className="pr-1 pt-[3px]" size="2">
        Trying to log in?
      </Text>
      <NextLink href="/login" prefetch={false}>
        <Text className="text-[12px] text-accent-12 underline-offset-2 hover:underline">
          Go to log in
        </Text>
      </NextLink>
    </Flex>
  )
}

export { Footer }
