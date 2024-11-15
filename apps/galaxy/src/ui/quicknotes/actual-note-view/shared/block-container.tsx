'use client'

import { PropsWithChildren } from 'react'
import { Flex, Heading, Separator } from '@radix-ui/themes'

interface BlockContainerProps extends PropsWithChildren {
  heading: string
  subHeading?: string
  separator?: boolean
}
const BlockContainer = ({
  heading,
  subHeading,
  children,
  separator=true
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
      {separator && <Separator orientation="horizontal" className="my-2 w-full" />}
    </>
  )
}

export { BlockContainer }
