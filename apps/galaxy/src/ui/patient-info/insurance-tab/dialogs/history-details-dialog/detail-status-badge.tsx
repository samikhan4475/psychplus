'use client'

import { Badge, BadgeProps, Flex } from '@radix-ui/themes'
import { useStore } from './store'

const DetailStatusBadge = () => {
  const { selectedRow } = useStore((state) => ({
    selectedRow: state.selectedRow,
  }))
  const verificationStatus = selectedRow?.verificationStatus

  let badgeColor: BadgeProps['color']
  switch (verificationStatus) {
    case 'Verified':
      badgeColor = 'green'
      break
    case 'Pending':
      badgeColor = 'blue'
      break
    case 'Unverifiable':
      badgeColor = 'red'
      break
    case 'NotRequested':
      badgeColor = 'orange'
      break
    default:
      badgeColor = 'gray'
  }

  return (
    <Flex justify="end">
      <Badge
        color={badgeColor}
        className="!rounded-1"
        variant="surface"
        size="2"
      >
        {verificationStatus ?? 'N/A'}
      </Badge>
    </Flex>
  )
}

export { DetailStatusBadge }
