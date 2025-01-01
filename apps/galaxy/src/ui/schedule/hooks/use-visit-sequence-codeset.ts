import { useMemo } from 'react'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'

type ServiceType = 'TimedServices' | 'NonTimedServices'

const useVisitSequenceCodeset = (
  serviceType: ServiceType,
  addNonGroupedCode = false,
) => {
  const codes = useCodesetCodes(CODESETS.VisitSequence)
  const filteredCodes = useMemo(
    () =>
      codes
        .filter(
          (code) =>
            code.attributes?.find(
              (attribute) => attribute.value === serviceType,
            ) ||
            (addNonGroupedCode && code.value === 'NA'),
        )
        .map((code) => code.value),
    [codes, serviceType, addNonGroupedCode],
  )
  return filteredCodes
}

export { useVisitSequenceCodeset }
