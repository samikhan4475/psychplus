import { useMemo } from 'react'
import { SharedCode } from '@/types'
import { useCodesetCodes } from '.'

const getCodeAttributeBoolean = (code: SharedCode, name?: string) =>
  ['True', 'true'].includes(
    code?.attributes?.find((attr) => attr?.name === name)?.value ?? '',
  )

const useCodesetOptions = (
  codeset: string,
  disableAttribute?: string,
  exclude?: string[],
) => {
  const codes = useCodesetCodes(codeset)

  return useMemo(() => {
    const filteredCodes = exclude
      ? codes?.filter((code) => !exclude.includes(code.value))
      : codes
    return filteredCodes.map((code) => ({
      value: code.value,
      label: code.display,
      disabled: disableAttribute
        ? !getCodeAttributeBoolean(code, disableAttribute)
        : undefined,
    }))
  }, [codes, disableAttribute, exclude])
}

export { useCodesetOptions, getCodeAttributeBoolean }
