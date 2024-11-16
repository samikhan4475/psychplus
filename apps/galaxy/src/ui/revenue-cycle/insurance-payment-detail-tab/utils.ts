import { SharedCode } from '@/types'

const getPaymentDisplay = (
  codeValue: string,
  codeSets: SharedCode[],
): string | undefined => {
  const codeSetLookup = codeSets.reduce((lookup, code) => {
    lookup[code.value] = code.display
    return lookup
  }, {} as Record<string, string>)

  return codeSetLookup[codeValue] ?? codeValue
}

export { getPaymentDisplay }
