import * as React from 'react'
import { type Metadata } from 'next'
import { Flex, Text } from '@radix-ui/themes'
import { AppLink } from '@psychplus/ui/app-link'

export const metadata: Metadata = {
  title: 'title',
  description: 'description',
}

const IndexLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Flex align="center" px="8" py="4" className="border-b border-b-gray-5">
        <AppLink href="/" className="mr-8">
          <Text size="4" weight="bold">
            P+
          </Text>
        </AppLink>
        <Flex gap="4">
          <AppLink href="/patient" className="hover:underline">
            <Text weight="medium">Example</Text>
          </AppLink>
        </Flex>
      </Flex>
      <main className="p-4">{children}</main>
    </>
  )
}

export default IndexLayout
