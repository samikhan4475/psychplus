'use client'

import { PropsWithChildren } from 'react'
import { Flex, Heading, Separator } from '@radix-ui/themes'

interface BlockContainerProps extends PropsWithChildren {
  heading: string
  subHeading?: string
}
const BlockContainer = ({
  heading,
  subHeading,
  children,
}: BlockContainerProps) => {
  return (
    <>
      <Flex direction="column" gap="1">
        <Heading size="3">{heading}</Heading>
        {subHeading && (
          <Heading size="3" weight="bold">
            {subHeading}
          </Heading>
        )}
        {children}
      </Flex>
      <Separator orientation="horizontal" className="my-2 w-full" />
    </>
  )
}

export { BlockContainer }
