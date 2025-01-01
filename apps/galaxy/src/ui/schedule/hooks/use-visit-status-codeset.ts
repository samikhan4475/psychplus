import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { useMemo } from 'react'

type AttributeType = 'Timed' | 'NonTimed' | 'Active' | 'Inactive'
const useVisitStatusCodeset = (attributeType: AttributeType) => {
  const codes = useCodesetCodes(CODESETS.AppointmentStatus)
  const filteredCodes = useMemo(() => codes
  .filter((code) =>
    code.attributes?.find((attribute) => attribute.value === attributeType),
  )
  .map((code) => code.value), [codes, attributeType])
  return filteredCodes
}

export { useVisitStatusCodeset }
