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
  groupingCodes?: string[],
) => {
  const codes = useCodesetCodes(codeset)

  return useMemo(() => {
    let filteredCodes: SharedCode[] = [...codes]
    if (exclude?.length) {
      filteredCodes = filteredCodes?.filter(
        (code) => !exclude.includes(code.value),
      )
    }
    if (groupingCodes?.length) {
      filteredCodes = filteredCodes.filter((item) =>
        groupingCodes?.some((code) => item.groupingCode?.startsWith(code)),
      )
    }
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
