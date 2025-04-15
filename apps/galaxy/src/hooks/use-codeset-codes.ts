import { useStore } from '@/store'

const useCodesetCodes = (name: string) => {
  const codesetCache = useStore((state) => state.codesets)

  if (!name) return []

  const parts = name.split('.')
  const [, codeSystemName, groupingPrefix] = parts

  const key = codeSystemName ?? name
  const allCodes = codesetCache[key]?.codes ?? []

  if (groupingPrefix) {
    return allCodes.filter((code) =>
      code.groupingCode?.startsWith(groupingPrefix),
    )
  }

  return allCodes
}

export { useCodesetCodes }
