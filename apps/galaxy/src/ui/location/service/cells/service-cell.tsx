'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Box, Text } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { useStore as useRootStore } from '@/store'
import { Service } from '@/types'
import { getCodesetDisplayName } from '@/utils'

const ServiceCell = ({ row: { original } }: PropsWithRow<Service>) => {
  const codes = useCodesetCodes(CODESETS.ServicesOffered)
  const router = useRouter()
  const addTab = useRootStore((state) => state.addTab)

  const openTab = () => {
    const href = `/management/location-service/services/${original.id}/location/${original.locationId}/service-groups`
    addTab({
      href,
      label: `${original.serviceOffered} (Service)`,
    })
    router.push(href)
  }
  return (
    <Box className="inline-flex">
      <Text
        size="1"
        className="flex max-w-[200px] cursor-pointer items-center overflow-hidden text-ellipsis whitespace-nowrap"
        onClick={openTab}
      >
        {getCodesetDisplayName(original.serviceOffered, codes)}
      </Text>
    </Box>
  )
}

export { ServiceCell }
