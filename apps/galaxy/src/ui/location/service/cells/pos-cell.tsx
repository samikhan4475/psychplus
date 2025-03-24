'use client'

import { Text, Tooltip } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { Service } from '@/types'
import { getPOSLabel } from '../utils'

const POSCell = ({ row: { original } }: PropsWithRow<Service>) => {
  const codes = useCodesetCodes(CODESETS.PlaceOfSerivce)
  const pos = getPOSLabel(codes, original.servicePlace)
  return (
    <Tooltip content={pos}>
      <Text size="1" className="max-w-48 line-clamp-3 w-max font-regular">
        {pos}
      </Text>
    </Tooltip>
  )
}

export { POSCell }
