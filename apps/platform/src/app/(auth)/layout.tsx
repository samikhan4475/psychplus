import { type Metadata } from 'next'
import { Flex, Text } from '@radix-ui/themes'
import { AppLink } from '@psychplus/ui/app-link'

export const metadata: Metadata = {
  title: 'title',
  description: 'description',
}

const IndexLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Flex align="center" px="8" py="4" className="border-b border-b-gray-5">
      <AppLink href="/" className="mr-8">
        <Text size="4" weight="bold">
          P+ Platform
        </Text>
      </AppLink>
      <Flex gap="4">
        <AppLink href="/widgets" className="hover:underline">
          <Text weight="medium">Widgets</Text>
        </AppLink>
        <AppLink href="/components" className="hover:underline">
          <Text weight="medium">Components</Text>
        </AppLink>
      </Flex>
    </Flex>
    <main>{children}</main>
  </>
)

export default IndexLayout
