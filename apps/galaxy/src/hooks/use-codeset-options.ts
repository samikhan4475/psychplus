import { useMemo } from 'react'
import { useCodesetCodes } from '.'

const useCodesetOptions = (codeset: string) => {
  const codes = useCodesetCodes(codeset)

  return useMemo(() => {
    return codes.map((code) => ({
      value: code.value,
      label: code.display,
    }))
  }, [codes])
}

export { useCodesetOptions }
