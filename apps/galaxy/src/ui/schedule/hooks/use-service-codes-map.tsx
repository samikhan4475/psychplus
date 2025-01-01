import { useMemo } from 'react'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'

const useServiceCodesMap = () => {
  const serviceCodes = useCodesetCodes(CODESETS.ServicesOffered)

  const mappedServices: Record<string, string> = useMemo(
    () =>
      serviceCodes.reduce(
        (acc, curr) => ({
          ...acc,
          [curr.value]: curr.display,
        }),
        {},
      ),
    [serviceCodes],
  )
  return mappedServices
}

export { useServiceCodesMap }