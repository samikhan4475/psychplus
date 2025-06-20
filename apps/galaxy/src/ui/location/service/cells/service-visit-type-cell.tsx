'use client'

import { Text, Tooltip } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { Service } from '@/types'
import { getCodesetDisplayName } from '@/utils'

const ServiceVisitTypeCell = ({ row: { original } }: PropsWithRow<Service>) => {
  const sequenceCodes = useCodesetCodes(CODESETS.VisitSequence)
  const mediumCodes = useCodesetCodes(CODESETS.VisitMedium)
  const visitTypes = original?.serviceVisitTypes?.map((visit) => {
    const sequence = getCodesetDisplayName(visit.visitSequence, sequenceCodes)
    const medium = getCodesetDisplayName(visit?.visitMedium, mediumCodes)
    return `${visit?.typeOfVisit} - ${sequence} - ${medium}`
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
