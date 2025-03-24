'use client'

import { Text, Tooltip } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { Service } from '@/types'
import { getCodesetDisplayName } from '@/utils'

const ServiceVisitTypeCell = ({ row: { original } }: PropsWithRow<Service>) => {
  const codes = useCodesetCodes(CODESETS.VisitSequence)
  const visitTypes = original?.serviceVisitTypes?.map((visit) => {
    const sequnce = getCodesetDisplayName(visit.visitSequence, codes)
    return `${visit?.typeOfVisit} - ${sequnce} - ${visit?.visitMedium}`
  })
  const serviceVisit = visitTypes?.join(' | ')
  return (
    <Tooltip content={serviceVisit}>
      <Text size="1" className="max-w-48 line-clamp-3 w-max font-regular">
        {serviceVisit}
      </Text>
    </Tooltip>
  )
}

export { ServiceVisitTypeCell }
