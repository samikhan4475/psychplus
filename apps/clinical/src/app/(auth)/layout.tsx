import { type Metadata } from 'next'
import NextLink from 'next/link'
import { Flex, Text } from '@radix-ui/themes'

export const metadata: Metadata = {
  title: 'title',
  description: 'description',
}

const IndexLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Flex align="center" px="8" py="4" className="border-b border-b-gray-5">
        <NextLink href="/" className="mr-8">
          <Text size="4" weight="bold">
            P+
          </Text>
        </NextLink>
        <Flex gap="4">
          <NextLink href="/user" className="hover:underline">
            <Text weight="medium">User</Text>
          </NextLink>
          <NextLink href="/patient" className="hover:underline">
            <Text weight="medium">Patient</Text>
          </NextLink>
          <NextLink
            href="widgets/preferred-partners-list"
            className="hover:underline"
          >
            <Text weight="medium">Preferred partner</Text>
          </NextLink>
          <NextLink
            href="galaxy/widgets/functional-cognitive-list"
            className="hover:underline"
          >
            <Text weight="medium">Functional Cognitive</Text>
          </NextLink>
          <NextLink
            href="galaxy/widgets/immunization-list"
            className="hover:underline"
          >
            <Text weight="medium">Immunization</Text>
          </NextLink>
          <NextLink
            href="galaxy/widgets/ccda-setting-preference"
            className="hover:underline"
          >
            <Text weight="medium">CCDA Setting Preference</Text>
          </NextLink>
        </Flex>
      </Flex>
      <main className="p-4">{children}</main>
    </>
  )
}

export default IndexLayout
