import { type Metadata } from 'next'
import NextLink from 'next/link'
import { Flex, Text } from '@radix-ui/themes'

export const metadata: Metadata = {
  title: 'title',
  description: 'description',
}

const IndexLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Flex align="center" px="8" py="4" className="border-b border-b-gray-5">
      <NextLink href="/" className="mr-8">
        <Text size="4" weight="bold">
          P+ Platform
        </Text>
      </NextLink>
      <Flex gap="4">
        <NextLink href="/widgets" className="hover:underline">
          <Text weight="medium">Widgets</Text>
        </NextLink>
        <NextLink href="/components" className="hover:underline">
          <Text weight="medium">Components</Text>
        </NextLink>
      </Flex>
    </Flex>
    <main>{children}</main>
  </>
)

export default IndexLayout
