'use client'

import { Badge, Flex } from '@radix-ui/themes'

const DetailStatusBadge = () => {
  return (
    <Flex justify="end">
      <Badge color="green" className="!rounded-1">
        Verified
      </Badge>
    </Flex>
  )
}

export { DetailStatusBadge }
