import { SharedCode } from '@/types'

const getGenderShortName = (codes: SharedCode[], codeName: string): string =>
  codes
    .find((codeset) => codeset.value === codeName)
    ?.attributes?.find((attr) => attr.name === 'X12Value')?.value ?? ''

export { getGenderShortName }
