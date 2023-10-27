import * as React from 'react'
import { type Metadata } from 'next'
import Link from 'next/link'
import { Flex, Text } from '@radix-ui/themes'

export const metadata: Metadata = {
  title: 'title',
  description: 'description',
}

const IndexLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Flex align="center" px="8" py="4" className=" border-b border-b-gray-5">
      <Link href="/" className="mr-8">
        <Text size="4" weight="bold">
          P+ Platform
        </Text>
      </Link>
      <Flex gap="4">
        <Link href="/widgets" className="hover:underline">
          <Text weight="medium">Widgets</Text>
        </Link>
        <Link href="/components" className="hover:underline">
          <Text weight="medium">Components</Text>
        </Link>
      </Flex>
    </Flex>
    <main>{children}</main>
  </>
)

export default IndexLayout
